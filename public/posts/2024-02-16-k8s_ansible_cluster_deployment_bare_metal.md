---
layout: post
title: Kubernetes Ansible Bare Metal Deployment
date: 2024-02-16
summary: Covers two ansible playbooks used to automatically deploy kubernetes cluster.
categories: guides
image: kubernetesLogo.png
---

## Guide results

- 1 master node running on ubuntu
- N worker nodes running on ubuntu
- CNI deployed
- Ability to add any amount of other services into script (CSI, ingress, etc)

## Prerequisites

- Everything is tested and tuned for Ubuntu 22.04 LTS server
  - If you want to use another os, there are various areas you will need to alter, but it is easily doable.
- At least 2 machines as targets for the script (1 control plane, 1 worker).
- Currently, the script does not support other operating systems than Ubuntu.
- It also does not support more than 1 control plane.
- However, both of these are pretty simple to implement, I simply have not had the time.

## Begin

There are two playbooks involved in this deployment. The first handles the base installation of the cluster, taking care of installing packages, configuring files, and initilizing the control plane and its workers. After this playbook is ran, you will have a working cluster with a CNI up and running.

The second playbook handles the services you want to use. I have intentionally seperated this to allow script users to easily change what services they want to deploy onto the cluster. You can provision ingress, csi, vault, etc from this playbook.

Lets now go over both playbooks so you can understand them better. If you just want to skip ahead and use them, the full playbooks are at the bottom of the post to copy.

TODO: Describe playbooks section by section

## Example inventory file

This is an extremely basic inventory file where I am directly putting passwords in. The reason is this is deployed in my homelab, you would never want to do this in a real environment.

Take note of the names at the start being IPS compared to hostnames, this is so the /etc/hosts file gets correctly updated for each host.

```ini
[masters]
192.168.3.200 ansible_host=192.168.3.200 ansible_user=user ansible_ssh_pass=pass ansible_become=yes ansible_become_method=sudo ansible_become_pass=pass

[workers]
192.168.3.210 ansible_host=192.168.3.210 ansible_user=user ansible_ssh_pass=pass ansible_become=yes ansible_become_method=sudo ansible_become_pass=pass
192.168.3.211 ansible_host=192.168.3.211 ansible_user=user ansible_ssh_pass=pass ansible_become=yes ansible_become_method=sudo ansible_become_pass=pass

[all:vars]
ansible_python_interpreter=/usr/bin/python3
ansible_ssh_common_args='-o StrictHostKeyChecking=no'
```

## Base Cluster Deployment Playbook

```yaml
---
- hosts: all
  become: yes
  vars:
    start_index: 1
    k8s_release_key_url: "https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key"
    k8s_signed_by_url: "https://pkgs.k8s.io/core:/stable:/v1.28/deb/"
    k8s_apt_keyring_path: "/etc/apt/keyrings/kubernetes-apt-keyring.gpg"
    k8s_sources_list_path: "/etc/apt/sources.list.d/kubernetes.list"
    k8s_package_version: "1.28"
  tasks:
    - name: Install required tools
      apt:
        name:
          - ca-certificates
          - curl
          - gnupg
        state: present
        update_cache: yes

    - name: Disable Swap File
      shell: swapoff -a

    - name: Remove Swap file from /etc/fstab
      replace:
        path: /etc/fstab
        regexp: ".*swap.*"
        replace: ""

    - name: Create /etc/modules-load.d/k8s.conf for all worker nodes
      copy:
        content: |
          overlay
          br_netfilter
        dest: /etc/modules-load.d/k8s.conf

    - name: Load the modules
      shell: sudo modprobe overlay && sudo modprobe br_netfilter

    - name: Configure kernel parameters for all nodes
      copy:
        content: |
          net.bridge.bridge-nf-call-iptables  = 1
          net.bridge.bridge-nf-call-ip6tables = 1
          net.ipv4.ip_forward                 = 1
        dest: /etc/sysctl.d/k8s.conf

    - name: Apply the changes
      shell: sudo sysctl --system

    - name: Set hostname for masters
      hostname:
        name: "k8-master-{{ start_index + groups['masters'].index(inventory_hostname) }}"
      when: "'masters' in group_names"

    - name: Set hostname for workers
      hostname:
        name: "k8-worker-{{ start_index + groups['workers'].index(inventory_hostname) }}"
      when: "'workers' in group_names"

    - name: Backup /etc/hosts file (Incase we are updating, or there are existing entries.)
      shell: mv /etc/hosts /etc/hosts.bak

    - name: Add initial entries to /etc/hosts
      copy:
        content: |
          127.0.0.1 localhost
          127.0.1.1 localhost

          # The following lines are desirable for IPv6 capable hosts
          ::1     ip6-localhost ip6-loopback
          fe00::0 ip6-localnet
          ff00::0 ip6-mcastprefix
          ff02::1 ip6-allnodes
          ff02::2 ip6-allrouters

          # Custom
        dest: /etc/hosts

    - name: Update 127.0.1.1 entry in /etc/hosts
      replace:
        path: /etc/hosts
        regexp: ".*127.0.1.1.*"
        replace: "127.0.1.1 {{ ansible_hostname }}"

    - name: Add entries to /etc/hosts for all hosts
      lineinfile:
        path: /etc/hosts
        line: "{{ hostvars[item]['inventory_hostname'] }} {{ hostvars[item]['ansible_hostname'] }}"
        create: yes
      loop: "{{ groups['all'] }}"
      loop_control:
        loop_var: item

    - name: Install stuff
      shell: |
        sudo apt-get update
        sudo install -m 0755 -d /etc/apt/keyrings
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --yes --dearmor -o /etc/apt/keyrings/docker.gpg
        sudo chmod a+r /etc/apt/keyrings/docker.gpg
        echo "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        sudo apt-get update
        sudo apt update && sudo apt install -y containerd.io
        containerd config default | sudo tee /etc/containerd/config.toml >/dev/null 2>&1
        sudo sed -i 's/SystemdCgroup \= false/SystemdCgroup \= true/g' /etc/containerd/config.toml
        sudo systemctl restart containerd && sudo systemctl enable containerd
        sudo apt update && sudo apt install -y apt-transport-https ca-certificates curl gpg
        curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --yes --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
        echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list
        sudo apt update && sudo apt install -y kubelet kubeadm kubectl && sudo apt-mark hold kubelet kubeadm kubectl

# - name: create the "{{ cluster_admin }}" user
#   user:
#     name: "{{ cluster_admin }}"
#     generate_ssh_key: true
#     ssh_key_type: "ed25519"
#     groups: sudo
#     state: present
#     create_home: yes
#     shell: /bin/bash

# - name: allow "{{ cluster_admin }}"  to have passwordless sudo
#   lineinfile:
#     dest: /etc/sudoers
#     line: '"{{ cluster_admin }}" ALL=(ALL) NOPASSWD: ALL'
#     validate: "visudo -cf %s"
# Setup isci for Longhorn
# - name: Install iscsi and nfs-common
#   apt:
#     name: [ 'open-iscsi', 'nfs-common' ]
#     state: present
#     update_cache: yes

# Ansible playbook to initialize the master node
- hosts: masters
  become: yes # Run as root
  vars:
    user: user
  tasks:
    - name: Check if the master node is already initialized
      stat:
        path: /etc/kubernetes/admin.conf
      register: kubeadm_init
    - name: Initialize the master node
      command: kubeadm init --pod-network-cidr=10.244.0.0/16
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized
    - name: Create .kube directory
      file:
        path: /home/{{ user }}/.kube
        state: directory
        owner: "{{ user }}"
        group: "{{ user }}"
        mode: 0755
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized
    - name: Copy the kube config file
      copy:
        src: /etc/kubernetes/admin.conf
        dest: /home/{{ user }}/.kube/config
        remote_src: yes
        owner: "{{ user }}"
        group: "{{ user }}"
        mode: 0644
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized
    - name: Install calico CNI
      command: kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
      become: yes
      become_user: "{{ user }}"
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized
    - name: Get the token for joining the worker nodes
      become: yes
      become_user: "{{ user }}"
      shell: kubeadm token create  --print-join-command
      register: kubernetes_join_command
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized
    - name: Display registered output
      debug:
        var: kubernetes_join_command.stdout_lines
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized
    - name: Set strictARP for metallb
      shell: |
        kubectl get configmap kube-proxy -n kube-system -o yaml | \
        sed -e "s/strictARP: false/strictARP: true/" | \
        kubectl apply -f - -n kube-system
      become: yes
      become_user: "{{ user }}"
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized
    - name: Create dummy host to store variable for node config
      add_host:
        name: "DUMMY_HOST"
        JOIN_COMMAND: "{{ kubernetes_join_command.stdout_lines[0] }}"
      when: kubeadm_init.stat.exists == false # Only run if the master node is not already initialized

# Ansible playbook to join the worker nodes to the cluster
- hosts: workers
  become: yes # Run as root

  tasks:
    - name: Check if the worker node is already joined
      stat:
        path: /etc/kubernetes/kubelet.conf
      register: kubeadm_join
    - name: Join the worker nodes to the cluster
      command: "{{ hostvars['DUMMY_HOST']['JOIN_COMMAND'] }}"
      become: yes
      when: kubeadm_join.stat.exists == false # Only run if the worker node is not already joined
```

## Services Deployment Playbook

```yaml
- hosts: masters
  become: yes # Run as root
  # TODO: Remove redundant commands
  vars:
    user: user
    metallbstart: "192.168.3.230"
    metallbend: "192.168.3.240"
  tasks:
    - name: Install Helm
      command: sudo snap install helm --classic
      become: yes
    - name: Prep Metallb
      shell: |
        kubectl get configmap kube-proxy -n kube-system -o yaml | sed -e "s/strictARP: false/strictARP: true/" | kubectl apply -f - -n kube-system
      become: yes
      become_user: "{{ user }}"
    - name: Install Metallb
      shell: |
        MBLVER=$(curl -s https://api.github.com/repos/metallb/metallb/releases/latest|grep tag_name|cut -d '"' -f 4)
        kubectl apply -f https://raw.githubusercontent.com/metallb/metallb/${MBLVER}/config/manifests/metallb-native.yaml
      become: yes
      become_user: "{{ user }}"
    - name: Configure metallb IP address pool
      shell: |
        kubectl apply -f - <<EOF
        apiVersion: metallb.io/v1beta1
        kind: IPAddressPool
        metadata:
          name: first-pool
          namespace: metallb-system
        spec:
          addresses:
          - {{ metallbstart }}-{{ metallbend }}
        EOF
      become: yes
      become_user: "{{ user }}"
    - name: Configure metallb L2Advertisement
      shell: |
        kubectl apply -f - <<EOF
        apiVersion: metallb.io/v1beta1
        kind: L2Advertisement
        metadata:
          name: metallb-l2-advertisement
          namespace: metallb-system
        spec:
          ipAddressPools:
          - first-pool
        EOF
      become: yes
      become_user: "{{ user }}"
    - name: Rolling restart of metallb pods
      command: kubectl rollout restart deployment controller -n metallb-system
      become_user: "{{ user }}"
      become: yes
    - name: Add helm repo
      kubernetes.core.helm_repository:
        name: longhorn
        repo_url: https://charts.longhorn.io
    - name: Install Longhorn
      kubernetes.core.helm:
        name: longhorn
        chart_ref: longhorn/longhorn
        namespace: longhorn-system
      become: yes
      become_user: "{{ user }}"
    - name: Install NGINX Ingress controller
      kubernetes.core.helm_repository:
        name: ingress-nginx
        repo_url: https://kubernetes.github.io/ingress-nginx
      become: yes
      become_user: "{{ user }}"
    - name: Install NGINX Ingress controller
      kubernetes.core.helm:
        name: ingress-nginx
        chart_ref: ingress-nginx/ingress-nginx
        namespace: ingress-nginx
      become: yes
      become_user: "{{ user }}"
```
