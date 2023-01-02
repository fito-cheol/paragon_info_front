import React, { useEffect, useState, useMemo } from 'react';
import './App.scoped.scss';
import ItemList from './pages/Item/List';
import HeroList from './pages/Hero/List';
import HomeMain from './pages/Home/Main';
import TestPage from './pages/Test';
import Write from './pages/Walkthrough/Write';
import List from './pages/Walkthrough/List';
import AppBar from './components/appBar/appBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import merge from 'ts-deepmerge';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './theme/Theme';
import CssBaseline from '@mui/material/CssBaseline';
import { ColorModeContext } from './context/ColorModeContext';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      console.log('Query Error:', error, query);
      if (query.state.data !== undefined) {
        // toast.error(`에러가 났어요!!`);
      }
    },
    onSuccess: data => {
      console.log(data);
    },
  }),
  defaultOptions: {
    queries: {
      // ✅ globally default to 600 seconds
      staleTime: 1000 * 600,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
  },
});

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
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <CssBaseline />
            <AppBar />
            <div className='container'>
              <div className={`labeling__wrapper labeling__wrapper--${theme.palette.mode}`}>
                <Routes>
                  <Route path='item' element={<ItemList />} />
                  <Route path='hero' element={<HeroList />} />
                  <Route path='write' element={<Write />} />
                  <Route path='modify/:no' element={<Write />} />
                  <Route path='list' element={<List />} />
                  <Route path='Test' element={<TestPage />} />
                  <Route path='*' element={<HomeMain />} />
                </Routes>
              </div>
            </div>
            <ToastContainer />
          </BrowserRouter>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
