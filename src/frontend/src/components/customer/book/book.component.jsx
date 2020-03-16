import React, {useEffect} from 'react';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {FormHelperText, ListItemText, Paper} from "@material-ui/core";
import Title from "../../title.component";
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import BookModalComponent from "./book-modal.component";
import Box from "@material-ui/core/Box";


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

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;


function RowComponent(props) {
    const classes = useStyles();

    return (
        <ListItem>
            <Paper className={classes.listPaper}>
                <ListItemText className={classes.roomName}>
                    <Grid style={{float: 'left'}}>
                        <h3 style={{marginBottom: '5px'}}>{props.rooms.name}</h3>
                        <FormHelperText style={{margin: '2px'}}>Room</FormHelperText>
                    </Grid>
                </ListItemText>
                <BookModalComponent rows={props.rooms} date={props.date} del={props.del} setDel={props.setDel}/>
            </Paper>
        </ListItem>
    )
}


export default function Book(props) {
    const classes = useStyles();
    const [date, setDate] = React.useState(null);
    const [rows, setRows] = React.useState([]);
    const [del, setDel] = React.useState(false);
    let c = 0;

    const handleDateChange = (e) => {
        setDate(e);
    };

    useEffect(_ => {
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
                                let now = new Date();
                                let avail = false;
                                for (let i in row.time_slots) {
                                    let a = true;
                                    for (let j in row.time_slots[i].bookings) {
                                        let then = new Date(row.time_slots[i].bookings[j].date)
                                        if (date && then.getDate() === date.getDate() && then.getMonth() === date.getMonth())
                                            a = false;
                                        console.log(then, date)
                                    }
                                    if (a)
                                        avail = true;
                                }

                                if (date && avail && Math.ceil((date - now) / (24 * 3600 * 1000)) >= 0 && Math.ceil((date - now) / (24 * 3600 * 1000)) <= row.num_days_in_adv) {
                                    c++;
                                    return (
                                        <RowComponent date={date} key={row.id} rooms={row} setDel={setDel}
                                                      del={del}/>)
                                }
                                return null
                            })}
                            {!c && date &&
                            <Typography color="textSecondary" style={{textAlign: 'center'}}>No rooms available for the
                                date!</Typography>}
                            {!c && !date &&
                            <Typography color="textSecondary" style={{textAlign: 'center'}}>Pick a date to
                                book!</Typography>}
                        </List>
                    </Paper>
                </Container>
            </main>
        </div>
    )
}