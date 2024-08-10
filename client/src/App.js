import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Users from './components/Users';
import CreateUser from './components/CreateUser';

const App = () => {
  return (
    <Router>
      <div>
        <NavBar />
        <Switch>
          <Route path="/users" component={Users} />
          <Route path="/create-user" component={CreateUser} />        
        </Switch>
      </div>
    </Router>
  );
};

export default App;
