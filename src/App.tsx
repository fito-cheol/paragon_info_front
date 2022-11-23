import React, { useEffect, useState, useMemo } from 'react';
import './App.scoped.scss';
import ItemList from './pages/Item/List';
import HeroList from './pages/Hero/List';
import AppBar from './components/appBar/appBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ToggleColorMode from './components/button/ToggleColorMode';
import { ColorModeContext } from './context/ColorModeContext';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar />
        <div className='container'>
          <div className={`labeling__wrapper labeling__wrapper--${theme.palette.mode}`}>
            <BrowserRouter>
              <Routes>
                <Route path='/item' element={<ItemList />}></Route>
                <Route path='/hero' element={<HeroList />}></Route>
                <Route path='*' element={<ItemList />}></Route>
              </Routes>
            </BrowserRouter>
            <ToggleColorMode />
          </div>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
