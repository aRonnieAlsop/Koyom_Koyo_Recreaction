import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import Header from './components/Header/Header';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar';
import Schedule from './components/Schedule/Schedule.jsx';

function App({ location }) {
    return (
        <div>
            <NavBar />
            {location.pathname === '/' && <Header />}
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/create-user" component={CreateUser} />
                    <Route path="/users" component={Users} />
                </Switch>
            </div>
        </div>
    );
}

const AppWithRouter = withRouter(App);

export default function AppWrapper() {
    return (
        <Router>
            <AppWithRouter />
        </Router>
    );
}



