import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './components/Users';
import CreateUser from './components/CreateUser';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/post" component={CreateUser} />        
        </Switch>
      </div>
    </Router>
  );
};

export default App;
