import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Radio} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import validator from 'validator'
import FormHelperText from "@material-ui/core/FormHelperText";
import axios from 'axios'
import * as qs from "qs";

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'relative',
        top: '45vh',
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
            fname: "",
            lname: "",
            username: "",
            email: "",
            pwd: "",
            role: "",
            validFname: true,
            validLname: true,
            validUsername: true,
            validEmail: true,
            validPwd: true,
            validRole: false,
            errorText: ''
        }
    }

    fnameChange = (e) => {
        this.setState({fname: e.target.value});
        if (!(e.target.value.toString().length >= 3))
            this.setState({validFname: false});
        else
            this.setState({validFname: true})
    };

    lnameChange = (e) => {
        this.setState({lname: e.target.value});
        if (!(e.target.value.toString().length >= 3))
            this.setState({validLname: false});
        else
            this.setState({validLname: true})
    };

    emailChange = (e) => {
        this.setState({email: e.target.value});
        if (!validator.isEmail(e.target.value))
            this.setState({validEmail: false});
        else
            this.setState({validEmail: true})
    };

    pwdChange = (e) => {
        this.setState({pwd: e.target.value});
        if (!(e.target.value.toString().length >= 8))
            this.setState({validPwd: false});
        else
            this.setState({validPwd: true})
    };

    roleChange = (e) => {
        this.setState({role: e.target.value});
        if (!(e.target.value.toString().length > 0))
            this.setState({validRole: false});
        else
            this.setState({validRole: true})
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
        // Fname
        if (!(this.state.fname.toString().length >= 3))
            this.setState({validFname: false});
        else
            this.setState({validFname: true});

        // Lname
        if (!(this.state.lname.toString().length >= 3))
            this.setState({validLname: false});
        else
            this.setState({validLname: true});

        // Username
        if (!(this.state.username.toString().length >= 5))
            this.setState({validUsername: false});
        else
            this.setState({validUsername: true});

        // Email
        if (!validator.isEmail(this.state.email))
            this.setState({validEmail: false});
        else
            this.setState({validEmail: true});

        // Pwd
        if (!(this.state.pwd.toString().length >= 8))
            this.setState({validPwd: false});
        else
            this.setState({validPwd: true});

        // Role
        if (!(this.state.role.toString().length > 0))
            this.setState({validRole: false});
        else
            this.setState({validRole: true});

        if (this.state.validFname && this.state.validLname && this.state.validUsername && this.state.validEmail && this.state.validPwd && this.state.validRole) {
            let data = {
                first_name: this.state.fname,
                last_name: this.state.lname,
                username: this.state.username,
                email: this.state.email,
                password: this.state.pwd,
                is_customer: false,
                is_room_manager: false
            };
            if (this.state.role === "customer")
                data.is_customer = true;
            if (this.state.role === "roomManager")
                data.is_room_manager = true;
            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };
            console.log(JSON.stringify(data));
            axios.post(baseUrl + '/signup', qs.stringify(data), config).then(res => {
                console.log(res);
                this.props.history.replace('/login');
            }).catch(error => {
                if (!error.response) {
                    // network error
                    console.log('Error: Network Error\n' + error);
                } else {
                    let err = '';
                    let data = error.response.data;
                    for (let d in data)
                        for (let i in data[d])
                            err += data[d][i];
                    this.setState({errorText: err})
                }
            })
        }
    };

    render() {
        return (
            <div>
                <form className={this.props.classes.form}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!this.state.validFname}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                onChange={this.fnameChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                error={!this.state.validLname}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="lname"
                                onChange={this.lnameChange}
                            />
                        </Grid>
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
                                error={!this.state.validEmail}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={this.emailChange}
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
                            <FormHelperText>
                                Signup as* :
                            </FormHelperText>
                            <RadioGroup onChange={this.roleChange}>
                                <FormControlLabel
                                    control={<Radio value="roomManager" color="primary"/>}
                                    label="Room Manager"
                                    name="role"
                                />
                                <FormControlLabel
                                    control={<Radio value="customer" color="primary"/>}
                                    label="Customer"
                                    name="role"
                                />
                            </RadioGroup>
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText error>{this.state.errorText}</FormHelperText><br/>
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={this.props.classes.submit}
                        onClick={this.submit}
                    >
                        Signup
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href={"/login"} onClick={(e)=>{e.preventDefault(); this.props.history.push('/login')}} variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        )
    }
}

export default function SignupComponent(props) {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Account
                </Typography>
                <Form classes={classes} history={props.history}/>
            </div>
        </Container>
    );
}