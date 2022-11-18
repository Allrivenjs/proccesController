import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/system';

import { App } from './router/App';

import { darkTheme } from './themes/darkTheme';
import { CssBaseline } from '@mui/material';

import io from 'socket.io-client';

const socket = io('http://localhost:4000');

socket.on('processInitialized', ( data ) => {
  console.log(data)

})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
