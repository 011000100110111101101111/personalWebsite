---
layout: post
title: Deep Dive Analysis into Network Communications
date: 2024-06-23
summary: This is more of a "learn with me" analysis compared to a guide for going deeper into how devices talk.
categories: networking
image: wipLogo.png
---

# Purpose of Post

I have been fine with setting up my homelab for a couple years now, but have never really invested the time to understand the underlying networking. I was always able to "just get by" and throw together my setup with a router, some switches, some computers, and some VLANS without actually understanding the deeper networking aspect of this.

I understood the high level facts that I could create some VLANs on my router, setup those VLANS on my switches, and plug in endpoints to create segmented networks. Now, I want to dive into the packet interaction to broaden my networking understanding. I will be doing this with the following,

- A 16 port smart-switch (TP-Link)
- An 8 port smart-switch (TP-Link)
- A Router running `RouterOS`
- A Mini PC
- A Raspberry PI
- My Macbook

If you are planning on following along, you do `NOT` need all of the above. You could get by with a router, 1 switch (smart for VLANS, dumb if not), and any two devices that you can plug into different places to test connectivity.

# Setup

**This post is not for you if you are looking for a step by step guide. Although I will be walking through everything I do, I have come to realize step-by-step guides have been extremely detremental to my learning. A lot of my previous guides are set up like this, but I will deviate moving forward. This is more of a `"learn with me analysis"`than a guide.**

I am starting completely fresh with all of these devices.

![image](/src/assets/images/underConstructionIcon.png)
