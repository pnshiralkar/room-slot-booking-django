import React, {useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import NumRooms from './num-rooms-tile.component';
import Rooms from './rooms.component.';
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";


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
        textAlign: 'center'
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
    CenterTile: {
        position: 'relative',
        left: '50%',
        transform: 'translateX(-50%)'
    }
}));

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;


export default function NumRoomsTile() {
    const classes = useStyles();

    const [rows, setRows] = React.useState([]);
    const [del, setDel] = React.useState(true);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    useEffect(() => {
        axios.get(baseUrl + '/rooms', {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            setRows(res.data);
        })
    }, [del]);

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Box color="text.secondary" style={{textAlign: 'center'}}><h2>Manage Rooms</h2></Box>

                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4} lg={3} className={classes.CenterTile}>
                            <Paper className={fixedHeightPaper}>
                                <NumRooms rooms={rows} setDel={setDel} del={del}/>
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Rooms rows={rows} setDel={setDel} del={del}/>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}