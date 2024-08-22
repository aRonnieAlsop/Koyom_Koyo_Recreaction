import React from 'react';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import CreateUser from './components/CreateUser';
import Users from './components/Users';
import Header from './components/Header/Header';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar/NavBar';

function App({ location }) {
    return (
        <div>
            {/* NavBar is always rendered */}
            <NavBar />
            {/* Only render the Header on the Home page */}
            {location.pathname === '/' && <Header />}
            <div>
                <Switch>
                    <Route path="/" exact component={Home} />
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



