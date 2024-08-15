import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import Header from './components/Header/Header';

function App() {
    return (
      <Router>
      <div>
          <Header />
          <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/create-user" component={CreateUser} />
              <Route path="/users" component={Users} />
          </Switch>
      </div>
  </Router>
    );
}

export default App;

