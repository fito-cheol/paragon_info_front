import React, { useEffect, useState, useMemo } from 'react';
import './App.scoped.scss';
import ItemList from './pages/Item/List';
import HeroList from './pages/Hero/List';
import HomeMain from './pages/Home/Main';
import TestPage from './pages/Test';
import WalkthroughWrite from './pages/Walkthrough/Write';
import AppBar from './components/appBar/appBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import merge from 'ts-deepmerge';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './theme/Theme';
import CssBaseline from '@mui/material/CssBaseline';
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

  let theme: Theme = useMemo(() => createTheme(merge(getDesignTokens(mode), getThemedComponents(mode))), [mode]);
  theme = responsiveFontSizes(theme);

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <CssBaseline />
          <AppBar />
          <div className='container'>
            <div className={`labeling__wrapper labeling__wrapper--${theme.palette.mode}`}>
              <Routes>
                <Route path='item' element={<ItemList />} />
                <Route path='hero' element={<HeroList />} />
                <Route path='Walkthrough' element={<WalkthroughWrite />} />
                <Route path='Test' element={<TestPage />} />
                <Route path='*' element={<HomeMain />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
