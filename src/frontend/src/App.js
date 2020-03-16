import React, {useEffect} from 'react';
import './App.css';
// noinspection ES6CheckImport
import {Route, Switch, useHistory, useLocation, withRouter} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage'


import SignupComponent from "./components/signup/signup.component";
import Login from "./components/login/login.component";
import MenuAppBar from "./components/app-bar/app-bar.component";
import Dashboard from "./components/room-manager/dashboard.components";
import CustomerDashboard from "./components/customer/customer-dashboard.component";
import Book from "./components/customer/book/book.component";
import ManageRooms from "./components/room-manager/rooms/manage-rooms-page.components";
import HomeComponent from "./components/home.component";
import ManageProfile from "./components/profile/manage-profile-page.component.jsx";
import ApiDoc from "./components/api-doc/api-doc";


function App() {
    const [auth, setAuth] = React.useState(false);
    const [role, setRole] = React.useState();
    const [title, setTitle] = React.useState('Room Slot Booking');
    const history = useHistory();
    const location = useLocation();


    useEffect(() => {
        if (reactLocalStorage.get('token'))
            setAuth(true);
        else
            setAuth(false);

        setRole(reactLocalStorage.get('role'));

        if (location.pathname === '/book' && reactLocalStorage.get('token') === null)
            history.replace('/');

        if (location.pathname === '/rooms' && reactLocalStorage.get('token') === null) {
            console.log(reactLocalStorage.get('token'));
            history.replace('/');
        }

        if(location.pathname === '/admin')
            window.location.replace('/admin/');

        if (location.pathname === '/api')
            setTitle('API Documentation');
        else {
            if (role === 'customer')
                setTitle('Customer Dashboard');
            else if (role === 'roomManager')
                setTitle('Room Manager Dashboard');
            else
                setTitle('Room Slot Booking')
        }
        // eslint-disable-next-line
    }, [auth, location.pathname, role]);

    return (
        <div>
            <MenuAppBar title={title} auth={auth} role={role} setAuth={setAuth} history={history}/>
            <Switch>
                <Route path="/signup">
                    <SignupComponent history={history}/>
                </Route>
                <Route path="/profile">
                    {auth && <ManageProfile history={history} setAuth={setAuth}/>}
                    {!auth && location.pathname === '/profile' && history.replace('/')}
                </Route>
                <Route path="/login">
                    <Login auth={auth} setAuth={setAuth} setRole={setRole} history={history}/>
                </Route>
                <Route path="/book">
                    {auth && <Book auth={auth} setAuth={setAuth} setRole={setRole} history={history}/>}
                </Route>
                <Route path="/rooms">
                    {auth && <ManageRooms auth={auth} setAuth={setAuth} setRole={setRole} history={history}/>}
                </Route>
                <Route path="/api">
                    <ApiDoc/>
                </Route>
                <Route path="/">
                    {(role === "roomManager") && <Dashboard history={history}/>}
                    {(role === "customer") && <CustomerDashboard history={history}/>}
                    {!(role === "roomManager") && !(role === "customer") &&
                    <HomeComponent history={history}/>
                    }
                </Route>
            </Switch>
        </div>
    );
}

export default withRouter(App);
