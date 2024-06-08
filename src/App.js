import Container from '@mui/material/Container';
import Header from './components/special/Header/Header';
// React Router
import { Box, CssBaseline } from '@mui/material';
import { createContext, useMemo, useState } from 'react';


import { Outlet } from 'react-router-dom';

// Theme Provider
import { ThemeProvider } from '@emotion/react';

import personalTheme from './personalTheme';

// Dynamic Title
function App() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('dark');

  const ColorModeContext = createContext({ toggleColorMode: () => {} });

  const toggleDrawer = (temp) => () => {
    if (!open && !temp) {
    } else {
      setOpen(temp);
    }
  };

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const colorMode = useMemo(
    () => ({
      toggleColorMode: toggleColorMode,
    }),
    []
  );

  const theme = useMemo(() => personalTheme(mode), [mode]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box onClick={toggleDrawer(false)} height='100vh'>
          <Header
              open={open}
              toggleDrawer={toggleDrawer}
              themeToggle={colorMode}
              theme={theme}
            />
          <Container maxWidth='lg' sx={{height: '88%'}}>
            <Outlet />
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
