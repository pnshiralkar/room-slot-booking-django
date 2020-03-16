import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText, Paper} from "@material-ui/core";
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    listPaper: {
        width: '100%',
        padding: '0 2%',
        cursor: 'pointer'
    },
    roomTitle: {
        float: 'left',
        margin: '5px'
    },
    roomSr: {
        float: 'left',
        margin: '5px',
        marginRight: '20px'
    },
    numDays: {
        float: 'right',
        margin: '0px 10% 0 0',
        transform: 'translateY(-10%)',
        textAlign: 'center',
        cursor: 'pointer'
    },
    numDaysH3: {
        marginBottom: '5px'
    }
}));

function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}


function formatDate(d) {
    return "" + pad(d.getFullYear(), 4) + "-" + pad(d.getMonth() + 1, 2) + "-" + pad(d.getDate(), 2);
}

function RowComponent(props) {
    const classes = useStyles();
    const [confirm, setConfirm] = React.useState(false);
    let ampmFrom = ' AM', ampmTo = ' AM';
    let from = parseInt(props.timeslot.time_from.split(':')[0]), to = parseInt(props.timeslot.time_to.split(':')[0]);
    if (from > 12) {
        from -= 12;
        ampmFrom = ' PM';
    }
    if (to > 12) {
        to -= 12;
        ampmTo = ' PM';
    }

    const handleConfirm = () => {
        setConfirm(true);
    };

    const handleBook = () => {
        axios.post(baseUrl + '/bookings', {
            date: formatDate(props.date),
            time_slot: props.timeslot.id,
        }, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then(() => {
            props.setDel(!props.del);
        }).catch(() => {
        })
    };

    return (
        <ListItem>
            <Paper className={classes.listPaper} onClick={!confirm ? handleConfirm : undefined}>
                <ListItemText className={classes.roomSr}>
                    <h3>{props.sr}</h3>
                </ListItemText>
                <ListItemText className={classes.roomTitle}>
                    <h3>{from + ':' + props.timeslot.time_from.split(':')[1] + ampmFrom}</h3>
                </ListItemText>
                <Box color="text.secondary" className={classes.roomTitle} style={{marginTop: '12px'}}><h3>to</h3></Box>
                <ListItemText className={classes.roomTitle}>
                    <h3>{to + ':' + props.timeslot.time_to.split(':')[1] + ampmTo}</h3>
                </ListItemText>
                {confirm && <div><ListItem>
                    <Typography component="div" style={{width: '100%', display: 'block'}}>
                        <Box color="text.secondary" style={{marginTop: '0', fontWeight: 'bold'}}>
                            Are you sure you want to book
                            room {props.room} on {formatDate(props.date)} from {from + ':' + props.timeslot.time_from.split(':')[1] + ampmFrom} to {to + ':' + props.timeslot.time_to.split(':')[1] + ampmTo} ?
                        </Box>
                    </Typography>
                </ListItem>
                    <ListItemText>
                        <Button variant="outlined" color="primary" onClick={handleBook}
                                style={{float: 'right'}}>YES</Button>
                        <Button variant="outlined" color="secondary" onClick={() => {
                            setConfirm(false);
                        }} style={{float: 'right', margin: '0 10px 10px 10px'}}>NO</Button>
                    </ListItemText>
                </div>}
            </Paper>
        </ListItem>
    )
}

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

export default function TimeSlotsBooking(props) {
    const rows = props.rows;
    return (
        <React.Fragment>
            <List>
                {rows.time_slots.map(row => {
                    let a = true;
                    for (let j in row.bookings) {
                        let then = new Date(row.bookings[j].date);
                        if (props.date && then.getDate() === props.date.getDate() && then.getMonth() === props.date.getMonth())
                            a = false;
                    }
                    if (a)
                        return (
                            <RowComponent key={row.id} date={props.date} room={props.rows.name} timeslot={row}
                                          setDel={props.setDel}
                                          del={props.del}/>)
                    return null
                })}
                {!rows.time_slots.length &&
                <Typography color="textSecondary" style={{textAlign: 'center'}}>No timeslots available!</Typography>}
            </List>
        </React.Fragment>
    );
}
