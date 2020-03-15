import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Layout from './layout';
import MobileLogin from './mobileFake/login';
import MobileChecklists from './mobileFake/checklists';

export default () => (
  <Router>
    <Switch>
      <Route component={MobileLogin} path="/mobile/login" />
      <Route component={MobileChecklists} path="/mobile/checklists" />
      <Route component={Layout} path="/" />
    </Switch>
  </Router>
);
