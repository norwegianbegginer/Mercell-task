import { ThemeProvider } from '@mui/material';
import React, { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Routes } from './pages';
import { theme } from './config/theme';
import { NavBar } from './components/NavBar';
import ErrorBoundary from './components/ErrorBoundary';
import FallbackPage from './pages/FallbackPage';
import CustomDrawer from './components/CustomDrawer';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<FallbackPage />}>
        <ThemeProvider theme={theme}>
          <Router>
            <>
              <RecoilRoot>
                <Routes />
              </RecoilRoot>
              <CustomDrawer />
            </>
          </Router>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
