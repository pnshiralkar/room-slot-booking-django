import React, {useEffect} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {FormHelperText, ListItemText, Paper} from "@material-ui/core";
import Title from "./Title";
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from '@material-ui/icons/Info';
import BookModal from "./BookModal";
import Box from "@material-ui/core/Box";

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
        textAlign: 'center'
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        textAlign: 'left'
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
    },
    listPaper: {
        width: '100%',
        padding: '0 2%'
    },
    delRoom: {
        float: 'right',
        margin: '44px 0px 0 ',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    },
}));

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const baseUrl = 'http://localhost:8000';


function RowComponent(props){
    const classes = useStyles();


    return(
        <ListItem>
            <Paper className={classes.listPaper} >
                <ListItemText className={classes.roomName}>
                    <Grid style={{float: 'left'}}>
                        <h3 style={{marginBottom: '5px'}}>{props.rooms.name}</h3>
                        <FormHelperText style={{margin: '2px'}}>Room</FormHelperText>
                    </Grid>
                </ListItemText>
                    <BookModal rows={props.rooms} date={props.date} del={props.del} setDel={props.setDel}/>
            </Paper>
        </ListItem>
    )
}



export default function Book(props) {
    const classes = useStyles();
    const [date, setDate] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [del, setDel] = React.useState(false);
    let c=0;

    const handleDateChange = (e) => {
        setDate(e);
    }

    useEffect(e => {
        axios.get(baseUrl + '/rooms', {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            setRows(res.data);
        })
    }, [del, date]);

    return (

        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    <Box color="text.secondary" style={{textAlign: 'center'}}><h2>Pick a date to book</h2></Box>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            margin="normal"
                            id="time-picker"
                            label="Date"
                            value={date}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change time',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <br/><br/><br/><br/>
                    <Paper className={classes.paper}>
                        <div style={{alignSelf: 'baseline'}}><Title>Available Rooms</Title></div>
                        <List>
                            {rows.map(row => {
                                let now = new Date()
                                let avail = false;
                                for(let i in row.time_slots){
                                    let a = true;
                                    for(let j in row.time_slots[i].bookings) {
                                        let then = new Date(row.time_slots[i].bookings[j].date)
                                        if (date && then.getDate() == date.getDate() && then.getMonth() == date.getMonth())
                                            a = false;
                                        console.log(then, date)
                                    }
                                    if(a)
                                        avail = true;
                                }

                                if (date && avail && Math.ceil((date - now)/(24*3600*1000)) >= 0 && Math.ceil((date - now)/(24*3600*1000)) <= row.num_days_in_adv) {
                                    c++;
                                    return (
                                        <RowComponent date={date} key={row.id} rooms={row} setDel={setDel}
                                                      del={del}/>)
                                }
                            })}
                            {!c && date && <Typography color="textSecondary" style={{textAlign: 'center'}}>No rooms available for the date!</Typography>}
                            {!c && !date && <Typography color="textSecondary" style={{textAlign: 'center'}}>Pick a date to book!</Typography>}

                        </List>
                    </Paper>
                </Container>to display
            </main>
        </div>
    )

}