import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from 'axios'
import * as qs from "qs";
import {reactLocalStorage} from 'reactjs-localstorage'

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative',
        top: '40vh',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pwd: "",
            role: "",
            validUsername: true,
            validPwd: true,
            validRole: false,
            errors: ""
        }
    }


    pwdChange = (e) => {
        this.setState({pwd: e.target.value});
        if (!(e.target.value.toString().length >= 8))
            this.setState({validPwd: false});
        else
            this.setState({validPwd: true})
    };


    usernameChange = (e) => {
        this.setState({username: e.target.value});
        if (!(e.target.value.toString().length >= 5))
            this.setState({validUsername: false});
        else
            this.setState({validUsername: true})
    };

    submit = (e) => {
        e.preventDefault();
        // Username
        if (!(this.state.username.toString().length >= 5))
            this.setState({validUsername: false});
        else
            this.setState({validUsername: true});

        // Pwd
        if (!(this.state.pwd.toString().length >= 8))
            this.setState({validPwd: false});
        else
            this.setState({validPwd: true});

        if (this.state.validUsername && this.state.validPwd) {
            let data = {
                username: this.state.username,
                password: this.state.pwd
            };
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            axios.post(baseUrl + '/login', qs.stringify(data), config).then(res => {
                this.setState({errors: ""});
                if (res.data.token) {
                    reactLocalStorage.remove('token');
                    reactLocalStorage.set('token', res.data.token)
                }
                this.props.setAuth(true);
                this.props.history.replace('/');
                axios.get(baseUrl + '/profile', {headers: {'Authorization': 'token ' + res.data.token}}).then((res) => {
                    let role;
                    if (res.data.is_customer)
                        role = 'customer';
                    else if (res.data.is_room_manager)
                        role = 'roomManager';
                    reactLocalStorage.remove('role');
                    reactLocalStorage.set('role', role);
                    this.props.setRole(role);
                })
            }).catch(error => {
                if (!error.response) {
                    // network error
                    console.log('Error: Network Error\n' + error);
                } else {
                    let res = error.response.data;
                    let errors = "";
                    for (let i in res)
                        errors += res[i][0] + "\n";
                    this.setState({errors});
                }
            })
        }
    };

    render() {
        return (
            <div>
                <form className={this.props.classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                error={!this.state.validUsername}
                                variant="outlined"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoComplete="username"
                                onChange={this.usernameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!this.state.validPwd}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={this.pwdChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText error>
                                {this.state.errors}
                            </FormHelperText>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.props.classes.submit}
                        onClick={this.submit}
                    >
                        Login
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={"/signup"} onClick={(e) => {
                                e.preventDefault();
                                this.props.history.push('/signup')
                            }} variant="body2">
                                Don't have an account? SignUp
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default function SignUp(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <Form classes={classes} {...props}/>
            </div>
        </Container>
    );
}