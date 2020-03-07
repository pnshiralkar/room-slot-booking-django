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
    const history = useHistory();

    useEffect(()=>{
        if(reactLocalStorage.get('token'))
            setAuth(true);
        else
            setAuth(false);
        setRole(reactLocalStorage.get('role'))
    })

    return (
        <div>
            <MenuAppBar auth={auth} setAuth={setAuth} history={history} />
            <Switch>
                <Route path="/signup">
                    <SignUp history={history}/>
                </Route>
                <Route path="/login">
                    <Login auth={auth} setAuth={setAuth} setRole={setRole} history={history}/>
                </Route>
                <Route path="/book">
                    <Book auth={auth} setAuth={setAuth} setRole={setRole} history={history}/>
                </Route>
                <Route path="/">
                    {(role == "roomManager") && <Dashboard/>}
                    {(role == "customer") && <CustomerDashboard history={history}/>}
                </Route>
            </Switch>
        </div>
    );
}

export default withRouter(App);
