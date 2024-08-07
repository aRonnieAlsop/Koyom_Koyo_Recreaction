import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Users from './components/Users';

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/users" component={Users} />
        
        </Switch>
      </div>
    </Router>
  );
};

export default App;
