import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import BookingsTileComponent from "./bookings-tile.component";
import Bookings from "./bookings.component";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        marginLeft: theme.spacing(7)
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
        height: '70px',
        width: '70px'
    }
}));

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

export default function Dashboard(props) {
    const classes = useStyles();
    const [rows, setRows] = React.useState([]);
    const [del, setDel] = React.useState(true);
    const [curr, setCurr] = React.useState('today');
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const handleAdd = () => {
        props.history.push('/book');
    };

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
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileComponent curr="today" title="Today's Bookings" rooms={rows} setDel={setDel}
                                                       del={del} setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileComponent curr="upcoming" title="Upcoming Bookings" rooms={rows} setDel={setDel}
                                                       del={del} setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileComponent curr="past" title="Past Bookings" rooms={rows} setDel={setDel}
                                                       del={del} setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <BookingsTileComponent curr="all" title="All Bookings" rooms={rows} setDel={setDel} del={del}
                                                       setCurr={setCurr}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Bookings customer curr={curr} rows={rows} setDel={setDel} del={del}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
                <Fab color="primary" size="large" aria-label="add" className={classes.addBtn} onClick={handleAdd}>
                    <AddIcon/>
                </Fab>
            </main>
        </div>
    );
}