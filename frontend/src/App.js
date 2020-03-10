import React, {useEffect} from 'react';
import logo1 from './logo.svg';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams, withRouter
} from "react-router-dom";
import Button from '@material-ui/core/Button';
import {reactLocalStorage} from 'reactjs-localstorage'
import { useHistory } from "react-router-dom";


import SignUp from "./components/Signup";
import Login from "./components/Login";
import {AppBar} from "@material-ui/core";
import MenuAppBar from "./components/AppBar";
import Dashboard from "./components/Dashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import Book from "./components/Book";
import ManageRooms from "./components/ManageRooms";
import Profile from "./components/Profile";
import ProfileModal from "./components/ProfileModal";
import Home from "./components/Home";


class Hello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    setInterval(()=>{
      this.setState((state, props)=>{
        return({count : state.count + 1})
      });
    }, 1000)
  }

  reset(){
    this.setState({count: 0});
  }

  render() {
        return (
            <div>
              <h1>Counter: {this.state.count}</h1>
              <Btn callback={this.reset} show={true}/>
            </div>
        )
    }
}


class Btn extends React.Component{
  reset = (e)=>{
    e.preventDefault();
    if(this.props.callback)
      this.props.callback();
  }

  render() {
    return this.props.show && (
        <div>
          {/*eslint-disable-next-line*/}
            <Button onClick={this.reset}>Click</Button>
          <a href="#" className="App-link" onClick={this.reset}>Click</a>
        </div>
    );
  }
}

function App() {
    const [auth, setAuth] = React.useState(false);
    const [role, setRole] = React.useState();
    const [title, setTitle] = React.useState('Room Slot Booking');
    const history = useHistory();

    useEffect(()=>{
        if(reactLocalStorage.get('token'))
            setAuth(true);
        else
            setAuth(false);
        setRole(reactLocalStorage.get('role'))
        if(role == 'customer')
            setTitle('Customer Dashboard')
        else if(role == 'roomManager')
            setTitle('Room Manager Dashboard')
        else
            setTitle('Room Slot Booking')
    })

    return (
        <div>
            <MenuAppBar title={title} auth={auth} role={role} setAuth={setAuth} history={history} />
            <Switch>
                <Route path="/signup">
                    <SignUp history={history}/>
                </Route>
                <Route path="/profile">
                    <ProfileModal history={history} name="Pratham S" username="pns" email="pns@pns.pns" imgLink="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"/>
                </Route>
                <Route path="/login">
                    <Login auth={auth} setAuth={setAuth} setRole={setRole} history={history} />
                </Route>
                <Route path="/book">
                    <Book auth={auth} setAuth={setAuth} setRole={setRole} history={history}/>
                </Route>
                <Route path="/rooms">
                    <ManageRooms auth={auth} setAuth={setAuth} setRole={setRole} history={history}/>
                </Route>
                <Route path="/">
                    {(role == "roomManager") && <Dashboard history={history}/>}
                    {(role == "customer") && <CustomerDashboard history={history}/>}
                    {!(role == "roomManager") && !(role == "customer") &&
                        <Home/>
                    }
                </Route>
            </Switch>
        </div>
    );
}

export default withRouter(App);
