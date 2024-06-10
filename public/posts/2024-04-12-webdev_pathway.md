---
layout: post
title: Documenting my web development pathway
date: 2024-04-12
summary: This post will be continously updated as I continue my journey to learn web development.
categories: discussions
image: wipLogo.png
---

## About

I initially found it a bit overwhelming starting to learn the technologies for web development, and wished there was a simple roadmap or discussion to follow that had previous failures and tips for advancement. I didn't find one... but I will leave one behind for the next person! This post will be in chronological order of what I learned, why I learned it, if it was useful and any hardships I ran into along the path. I hope this helps someone else down the line. Lets get into the pathway.

### HTML + CSS

I kicked my journey off with HTML and CSS. In my opinion it was extremely helpful to learn these side by side compared to consecutively because when it clicked it really clicked. It also gives the advantage of reinforcing the other language while learning. What I mean is if you introduce a new HTML element to the page, you can then apply what you have already learned from CSS to that element, reinforcing the knowledge. This is compared to making an entire HTML page, then apply CSS to it once as you are learning it. Obviously this is just my two cents, but I found it accelerated my learning.

Here are some great resources I used during this process.

- [W3Schools HTML](https://www.w3schools.com/html/)
- [W3Schools CSS](https://www.w3schools.com/css/)
- [FreeCodeCamp HTML Video](https://www.youtube.com/watch?v=916GWv2Qs08&list=PLWKjhJtqVAbmMuZ3saqRIBimAKIMYkt0E&index=3)
- [FreeCodeCamp CSS Video](https://www.youtube.com/watch?v=OXGznpKZ_sA&list=PLWKjhJtqVAbmMuZ3saqRIBimAKIMYkt0E&index=3)

The following videos REALLY made it click once I had some basic knowledge.

- [Modern Website From Scratch (DesignCourse)](https://www.youtube.com/watch?v=6ln_PFw_dYU&t=2868s)

Another topic I would mention is design. When you are learning, for all means go all out. It teaches you more and is fun. However, at some point I realized that more is not better. A simple website with great colors looks WAY better than a overcomplex design with shading and tons of colors and everything else. It looks professional, and it looks CLEAN. This was important to take my website design from something that looked like it belonged in 2005, to a trendy current site.

### React + Material UI

I decided React was the next logical step, and since I have 0 design talent in my body, I also decided to use Material UI. For those that do not know (As I did not), Material UI is basically a ton of prebuilt components that you can use to build more complex stuff. Let us use this current post as an example.

Withing this post is the header up top. This is actually made of a few components, lets look at the code.

```javascript
const Header = ({title, open, toggleDrawer, children, themeToggle, theme}) => {
  return (
    <Box sx={HeaderStyles.wrapper}>
      <Box sx={HeaderStyles.themeMode}>
        <IconButton sx={{ ml: 1 }} onClick={themeToggle.toggleColorMode} color="inherit">
          {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Box sx={{marginLeft: '1rem', display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
          <Typography variant='h6'>
            Nexus
          </Typography>
        </Box>
      </Box>
      <Box sx={HeaderStyles.title}>
        {title}
      </Box>
      <Box sx={HeaderStyles.nav}>
        <Navigation
          open={open}
          toggleDrawer={toggleDrawer}
          children={children}
        />
      </Box>
    </Box>
  )
}

export default Header
```

See those 3 lines in the top right of this site that expands the menu when you click it? That comes from this portion,

```javascript
<Navigation
          open={open}
          toggleDrawer={toggleDrawer}
          children={children}
        />
```

Which itself is a component I built and imported from another file here,

```javascript
const Navigation = ({open, toggleDrawer, children}) => {
  const navigate = useNavigate();
  const DrawerList = (
    <Box sx={ navbarStyles.wrapper } role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {NavBarItems.map(
          (item) => (
            <ListItem
              key={item.id}
              disablePadding
              onClick={() => navigate(item.route)}
            >
              <ListItemButton>
                <ListItemIcon sx={navbarStyles.icons}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText sx={navbarStyles.text}>
                  {item.text}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );


  return (
    <MenuButton
      color='primary'
      variant='text'
      size='small'
      onClick={toggleDrawer(true)}
      sx={navbarStyles.menu}
      >
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        anchor='right'
      >
        {DrawerList}
      </Drawer>
      <MenuIcon />
    </MenuButton>
  )
}

export default Navigation
```

So, for a normal item like `<Box />`, which comes from `Material UI`, you can think of that as just another file like this that can take a bunch of arguments (props). To drive this concept home, lets use our menu button example which is the actual `Button` component you click when you press the menu.

```javascript
<MenuButton
      color='primary'
      variant='text'
      size='small'
      onClick={toggleDrawer(true)}
      sx={navbarStyles.menu}
      >
```

We can see it is called `MenuButton`, and is getting passed 5 `props`. Now, if we head over to our MenuButton.js file, we will see how this is actually used.

```javascript
const MenuButton = ({sx, color, variant, size, onClick, disabled, children}) => {
  return (
    <Button
      sx={sx}
      color={color}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

export default MenuButton
```

As you can see, we are passing in those sx, color, etc `props` at the top here,

```javascript
const MenuButton = ({sx, color, variant, size, onClick, disabled, children}) 
```

and then using them in a base `Material UI` `Button`.

```javascript
<Button
      sx={sx}
      color={color}
      variant={variant}
      size={size}
      onClick={onClick}
      disabled={disabled}
    >
```

This is essentially Material UI in a nutshell. You can use their comprehensive list of items to build out more advanced items for REUSABILITY.

I have loved learning about Web Development topics, but this has also been done in my hobby time. I will still update the site with an About page and other stuff, and probably change around a lot of the looks, but I think I am now going to pivot back to DevOps since the framework for posting is now working.
