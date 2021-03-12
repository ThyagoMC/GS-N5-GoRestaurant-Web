import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import About from "../pages/About";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/about" exact component={About} />
  </Switch>
);

export default Routes;
