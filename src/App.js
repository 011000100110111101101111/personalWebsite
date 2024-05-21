// import './App.css';

import { CssBaseline } from '@mui/material';
// import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from "react-router-dom";
import Header from './components/Header/Header';

export default function App() {
  const [title, setTitle] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const parsedTitle = location.pathname.replace(/\W/g, ' ');
    console.log(location.pathname);
    setTitle(parsedTitle)
  }, [location])

  return (
    <Container
      maxWidth='md'
    >
      <CssBaseline />
      <Header title={title} />
      <Outlet />
    </Container>
  );
}