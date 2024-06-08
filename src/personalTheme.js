import { createTheme } from '@mui/material/styles';

const personalTheme = (mode) =>
  createTheme({
  // components: {
  //   MuiButton: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: '.875rem',
  //         fontWeight: 600,
  //         borderRadius: 8.5,
  //         textTransform: 'none',
  //         '&.MuiButton-contained': {
  //           backgroundColor: '#009be5',
  //           '&:hover': {
  //             backgroundColor: '#006db3'
  //           }
  //         },
  //         '&.MuiButton-outlined': {
  //           color: '#fff',
  //           borderColor: 'rgba(255, 255, 255, 0.7)',
  //           '&:hover': {
  //             backgroundColor: 'rgba(0, 0, 0, 0.04)',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   MuiSvgIcon: {
  //     styleOverrides: {
  //       root: {
  //         fontSize: '1.7rem',
  //       }
  //     }
  //   },
  // },
  palette: {
    mode,
  },
  typography: {
    // h1: {
    //   color: '#fff',
    //   fontSize: '1.6rem',
    //   fontWeight: 600,
    //   letterSpacing: '0.5px',
    //   textTransform: 'capitalize',
    // },
    h5: {
      // textShadow: '0.05em 0 black, 0 0.05em black,-0.05em 0 black,0 -0.05em black,-0.05em -0.05em black,-0.05em 0.05em black,0.05em -0.05em black,0.05em 0.05em black;',
      fontWeight: 'bolder'
    },
    // body2: {
    //   fontWeight: 'bolder'
    // },
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

// export default function DashboardThemeFunction({children}) => {
//   return (
//     <ThemeProvider theme={dashboardTheme}>
//       {children}
//     </ThemeProvider>
//   )
// }

export default personalTheme