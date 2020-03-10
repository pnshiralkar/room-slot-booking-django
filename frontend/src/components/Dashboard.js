import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {mainListItems, secondaryListItems} from './listItems';
import Chart from './Chart';
import NumRooms from './NumRooms';
import Rooms from './Rooms';
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import TransitionsModal from "./AddRoomModal";
import BookingsTileCust from "./BookingsTileCust";
import Bookings from "./Bookings";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 340;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    addBtn: {
        position: 'fixed',
        right: '3%',
        bottom: '3%',
        // height: '70px',
        // width: '70px'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));
const baseUrl = 'http://localhost:8000';
export default function Dashboard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const [del, setDel] = React.useState(true);
    const [curr, setCurr] = React.useState('today');
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const handleManageRooms = (e) => {
        props.history.push('/rooms');
    }

    useEffect(() => {
        axios.get(baseUrl + '/bookings', {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            setRows(res.data);
        })
    }, [del]);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3} >
                        {/* Recent NumRooms */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileCust curr="today" title="Today's Bookings" rooms={rows} setDel={setDel} del={del} setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileCust curr="upcoming" title="Upcoming Bookings" rooms={rows} setDel={setDel} del={del} setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileCust curr="past" title="Past Bookings" rooms={rows} setDel={setDel} del={del} setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileCust curr="all" title="All Bookings" rooms={rows} setDel={setDel} del={del} setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        {/* Recent Rooms */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Bookings roomManager curr={curr} rows={rows} setDel={setDel} del={del}/>
                                {curr == 'new' && <Bookings rows={rows} setDel={setDel} del={del}/>}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.addBtn} onClick={handleManageRooms}>
                    <EditIcon className={classes.extendedIcon} />
                      Manage Rooms
                </Fab>
            </main>
        </div>
    );
}