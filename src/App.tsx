import React, { useEffect, useState, useMemo } from 'react';
import merge from 'ts-deepmerge';
import { AxiosError } from 'axios';

import ItemList from './pages/Item/List';
import HeroList from './pages/Hero/List';
import TestPage from './pages/Test';
import MainPage from './pages/Home/Main';
import RedirectPage from './pages/Redirect/Google';
import Write from './pages/Walkthrough/Write';
import List from './pages/Walkthrough/List';
import AppBar from './components/appBar/appBar';
import CssBaseline from '@mui/material/CssBaseline';
import LoadingBar from 'react-top-loading-bar';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from 'redux/hooks';
import type { RootState } from 'redux/store';
import { completeProgress } from 'redux/module/progress';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scoped.scss';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider, responsiveFontSizes, Theme } from '@mui/material/styles';
import { getDesignTokens, getThemedComponents } from './theme/Theme';
import { ColorModeContext } from './context/ColorModeContext';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if ((error as AxiosError).code == 'ERR_NETWORK') {
        toast.error(`서버와 연결되지 않습니다`);
      }
      query.state.data;
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

  const progress = useAppSelector((state: RootState) => state.progress.progress);
  const dispatch = useAppDispatch();

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
            <LoadingBar color='#a1d9b6' progress={progress} onLoaderFinished={() => dispatch(completeProgress())} />
            <AppBar />
            <div className='container'>
              <div className={`labeling__wrapper labeling__wrapper--${theme.palette.mode}`}>
                <Routes>
                  <Route path='item' element={<ItemList />} />
                  <Route path='hero' element={<HeroList />} />
                  <Route path='write' element={<Write />} />
                  <Route path='modify/:no' element={<Write />} />
                  <Route path='list' element={<List />} />
                  <Route path='test' element={<TestPage />} />
                  <Route path='' element={<MainPage />} />
                  <Route path='redirect' element={<RedirectPage />} />
                  <Route path='*' element={<Navigate to='/list' replace />} />
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
