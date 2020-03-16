import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from "@material-ui/core/TextField";
import validator from "validator";
import axios from "axios";
import * as qs from "qs";
import {reactLocalStorage} from "reactjs-localstorage";
import {FormHelperText} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '100px'
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
}));

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;


class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            fname: "",
            lname: "",
            username: "",
            email: "",
            pwd: "",
            pwdConf: "",
            role: "",
            validFname: true,
            validLname: true,
            validUsername: true,
            validEmail: true,
            validPwd: true,
            validPwdConf: true,
            validRole: false,
            errorText: ''
        }
    }

    fnameChange = (e) => {
        e.preventDefault();
        this.setState({fname: e.target.value});
        console.log(e.target.value);
        if (!(e.target.value.toString().length >= 3))
            this.setState({validFname: false});
        else
            this.setState({validFname: true})
    };

    lnameChange = (e) => {
        e.preventDefault();
        this.setState({lname: e.target.value});
        console.log(e.target.value);
        if (!(e.target.value.toString().length >= 3))
            this.setState({validLname: false});
        else
            this.setState({validLname: true})
    };

    emailChange = (e) => {
        e.preventDefault();
        this.setState({email: e.target.value});
        console.log(e.target.value);
        if (!validator.isEmail(e.target.value))
            this.setState({validEmail: false});
        else
            this.setState({validEmail: true})
    };

    pwdChange = (e) => {
        e.preventDefault();
        this.setState({pwd: e.target.value});
        console.log(e.target.value);
        if (!(e.target.value.toString().length >= 8))
            this.setState({validPwd: false});
        else
            this.setState({validPwd: true})
    };

    pwdConfChange = (e) => {
        e.preventDefault();
        this.setState({pwdConf: e.target.value});
        console.log(e.target.value);
        if (!(e.target.value.toString() === this.state.pwd))
            this.setState({validPwdConf: false});
        else
            this.setState({validPwdConf: true})
    };

    usernameChange = (e) => {
        e.preventDefault();
        this.setState({username: e.target.value});
        console.log(e.target.value);
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
        if (!(this.state.pwd.toString().length >= 8 || this.state.pwd.toString().length === 0))
            this.setState({validPwd: false});
        else
            this.setState({validPwd: true});

        // Confirm pwd
        if (!(this.state.pwdConf === this.state.pwd))
            this.setState({validPwdConf: false});
        else
            this.setState({validPwdConf: true});

        // Role
        if (!(this.state.role.toString().length > 0))
            this.setState({validRole: false});
        else
            this.setState({validRole: true});

        if (this.state.validFname && this.state.validLname && this.state.validUsername && this.state.validEmail && this.state.validPwd && this.state.validPwdConf) {
            let data = {};

            if (this.state.fname.toString().length !== 0)
                data.first_name = this.state.fname;
            if (this.state.lname.toString().length !== 0)
                data.last_name = this.state.lname;
            if (this.state.username.toString().length !== 0)
                data.username = this.state.username;
            if (this.state.email.toString().length !== 0)
                data.email = this.state.email;
            if (this.state.pwd.toString().length !== 0)
                data.pwd = this.state.pwd;

            const config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'token ' + reactLocalStorage.get('token')
                }
            };
            console.log(JSON.stringify(data));
            axios.patch(baseUrl + '/profile', qs.stringify(data), config).then(res => {
                console.log(res);
                this.setState({edit: false});
                // this.props.history.replace('/login');
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

    componentDidMount() {
        axios.get(baseUrl + '/profile', {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            this.setState({
                username: res.data.username,
                fname: res.data.first_name,
                lname: res.data.last_name,
                email: res.data.email,
            })
        }).catch(error => {
            if (!error.response) {
                // network error
                console.log('Error: Network Error\n' + error);
            } else {
                console.log(error.response.data.message);
            }
        })
    }

    handleLogout = () => {
        this.props.setAuth(false);
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('role');
        this.props.history.replace('/');
    };

    render() {
        return (
            <div>
                {this.state.edit && <form className={this.props.classes.form}>
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
                                onChange={this.fnameChange}
                                defaultValue={this.state.fname}
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
                                defaultValue={this.state.lname}
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
                                defaultValue={this.state.username}
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
                                defaultValue={this.state.email}
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
                                autoComplete="off"
                                onChange={this.pwdChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                error={!this.state.validPwdConf}
                                variant="outlined"
                                required
                                fullWidth
                                name="conf-password"
                                label="Confirm Password"
                                type="password"
                                id="conf-password"
                                autoComplete="off"
                                onChange={this.pwdConfChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText error>{this.state.errorText}</FormHelperText><br/>
                        </Grid>
                    </Grid>
                </form>}
                {!this.state.edit && <div>
                    <Typography component="h2" variant="h4" align="center" color="textPrimary">
                        {this.state.fname} {this.state.lname}
                    </Typography><br/>
                    <Typography component="h4" variant="h5" align="center" color="textSecondary">
                        {this.state.username}
                    </Typography>
                    <Typography component="h4" variant="h5" align="center" color="textSecondary">
                        {this.state.email}
                    </Typography>
                </div>}
                <div className={this.props.classes.heroButtons}>
                    <Grid container spacing={2} justify="center">
                        <Grid item>
                            {this.state.edit && <Button variant="contained" color="primary" onClick={this.submit}>
                                Save Changes
                            </Button>}
                            {!this.state.edit && <Button variant="contained" color="primary" onClick={() => {
                                this.setState({edit: true})
                            }}>
                                Edit Profile
                            </Button>}
                        </Grid>
                        <Grid item>
                            <Button variant="outlined" color="primary" onClick={this.handleLogout}>
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }
}


export default function Home(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom
                                    style={{marginBottom: '50px'}}>
                            User Profile
                        </Typography>
                        <Form classes={classes} setAuth={props.setAuth} history={props.history}/>

                    </Container>
                </div>

            </main>
        </div>
    );
}