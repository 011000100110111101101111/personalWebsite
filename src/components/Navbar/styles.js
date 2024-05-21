export const navbarStyles = {
  drawer: {
    width: 320,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: 210,
        boxSizing: 'border-box',
        backgroundColor: '#101f33',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    '& .Mui-selected': {
      color: 'red',
    },
  },
  icons: {
    color: 'rgba(255, 255, 255, 0.7)!important',
    marginLeft: '20px',
  },
  text: {
    '& span': {
      marginLeft: '-10px',
      fontWeight: '600',
      fontSize: '16px',
    }
  },
  buttonIcons: {
    marginLeft: '0px',
    colorPrimary: 'red',
  }
}