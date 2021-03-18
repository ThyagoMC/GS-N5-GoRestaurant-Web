import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './routes';
import AppProvider from "./hooks";

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <AppProvider>
        <Routes />
      </AppProvider>
    </Router>
  </>
);

export default App;
