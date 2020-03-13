import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Title from '../title.component';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {FormHelperText, ListItemText, Paper} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import ProfileModal from "../profile/profile-modal.component";

const useStyles = makeStyles(_ => ({
    listPaper: {
        width: '100%',
        padding: '0 2%'
    },
    roomTitle: {
        float: 'left',
        margin: '11px 10px'
    },
    roomName: {
        float: 'left',
        marginRight: '10%'
    },
    delRoom: {
        float: 'right',
        margin: '44px 0px 0 ',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    },
}));

function formatTime(s) {
    let n = parseInt(s.split(':')[0]), ampm = ' AM';
    if (n > 12) {
        n -= 12;
        ampm = ' PM';
    }
    return n + ':' + s.split(':')[1] + ampm;
}

function RowComponent(props) {
    const classes = useStyles();

    const handleDel = (e) => {
        e.preventDefault();
        axios.delete(baseUrl + '/bookings/' + props.booking.id, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((_) => {
            props.setDel(!props.del);
        })
    };

    const deletable = (s) => {
        s = s.replace('-', '').replace('-', '');
        let sn = parseInt(s), d = new Date(), now;
        now = parseInt(pad(d.getFullYear(), 4) + pad(d.getMonth() + 1, 2) + pad(d.getDate(), 2));

        return sn >= now;
    };

    return (
        <ListItem>
            <Paper className={classes.listPaper}>
                <ListItemText className={classes.roomName}>
                    <Grid style={{textAlign: 'center'}}>
                        <h3 style={{marginBottom: '5px'}}>{props.booking.time_slot.room_id.name}</h3>
                        <FormHelperText style={{margin: '2px', textAlign: 'center'}}>Room</FormHelperText>
                    </Grid>
                </ListItemText>
                <ListItemText className={classes.roomTitle}>
                    <Grid style={{textAlign: 'center'}}>
                        <h3 style={{marginBottom: '5px'}}>{(props.booking.date)}</h3>
                    </Grid>
                </ListItemText>
                <ListItemText className={classes.roomTitle}>
                    <Grid style={{textAlign: 'center'}}>
                        <h3 style={{marginBottom: '5px'}}>{formatTime(props.booking.time_slot.time_from)}</h3>
                    </Grid>
                </ListItemText>
                <Box color="text.secondary" className={classes.roomTitle} style={{marginTop: '19px'}}><h3>to</h3></Box>
                <ListItemText className={classes.roomTitle}>
                    <Grid style={{textAlign: 'center'}}>
                        <h3 style={{marginBottom: '5px'}}>{formatTime(props.booking.time_slot.time_to)}</h3>
                    </Grid>
                </ListItemText>
                {!props.roomManager && deletable(props.booking.date) &&
                <IconButton className={classes.delRoom} onClick={handleDel}>
                    <DeleteIcon/>
                </IconButton>}
                {props.roomManager &&
                <ProfileModal customer name={props.booking.customer.first_name + ' ' + props.booking.customer.last_name}
                              username={props.booking.customer.username} email={props.booking.customer.email}
                              imgLink="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"/>}
                {props.customer && <ProfileModal roomManager
                                                 name={props.booking.time_slot.room_id.owner.first_name + ' ' + props.booking.time_slot.room_id.owner.last_name}
                                                 username={props.booking.time_slot.room_id.owner.username}
                                                 email={props.booking.time_slot.room_id.owner.email}
                                                 imgLink="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"/>}
            </Paper>
        </ListItem>
    )
}

function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function dateOk(s, curr) {
    s = s.replace('-', '').replace('-', '');
    let sn = parseInt(s), d = new Date(), now;
    now = parseInt(pad(d.getFullYear(), 4) + pad(d.getMonth() + 1, 2) + pad(d.getDate(), 2));
    console.log(sn, now);

    if (curr === 'upcoming')
        return sn > now;
    else if (curr === 'past')
        return sn < now;
    else if (curr === 'today')
        return sn === now;
    else if (curr === 'all')
        return true;
}

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

export default function Bookings(props) {
    let c = 0;
    for (let i in props.rows)
        if (dateOk(props.rows[i].date, props.curr))
            c++;

    let title;
    if (props.curr === 'upcoming')
        title = 'Upcoming Bookings';
    else if (props.curr === 'past')
        title = 'Past Bookings';
    else if (props.curr === 'today')
        title = 'Today\'s Bookings';
    else if (props.curr === 'new')
        title = 'New Booking';
    else if (props.curr === 'all')
        title = 'All Bookings';
    const rows = props.rows;
    return (
        <React.Fragment>
            <Title>{title}</Title>

            <List>
                {rows.map(row => {
                    if (dateOk(row.date, props.curr))
                        return (
                            <RowComponent roomManager={props.roomManager} customer={props.customer} curr={props.curr}
                                          key={row.id} booking={row} setDel={props.setDel} del={props.del}/>)
                    return null
                })}
                {!c &&
                <Typography color="textSecondary" style={{textAlign: 'center'}}>No bookings to display!</Typography>}
            </List>


        </React.Fragment>
    );
}
