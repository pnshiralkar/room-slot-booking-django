import React, {useEffect} from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
    FormHelperText,
    GridListTile,
    Input,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Paper
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import IconButton from "@material-ui/core/IconButton";
import TimeSlotsModal from "./TimeSlotsModal";
import ToolbarText from "@material-ui/pickers/_shared/ToolbarText";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
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
    delRoom: {
        float: 'right',
        margin: '33px 0px 0 ',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
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
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}


function  formatDate(d) {
    return "" + pad(d.getFullYear(), 4) + "-" + pad(d.getMonth()+1, 2) + "-" + pad(d.getDate(), 2);
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

    const handleConfirm = (e) => {
        setConfirm(true);
    }

    const handleBook = (e)=>{
        console.log(props.timeslot)
        axios.post(baseUrl + '/bookings', {
            date: formatDate(props.date),
            time_slot: props.timeslot.id,
        }, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            props.setDel(!props.del);
        }).catch(e => {
            // let err = '';
            // let data = e.response.data;
            // for (let d in data)
            //     for (let i in data[d])
            //         err += data[d][i];
            // setErrorText(err);
        })
    }

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
                        <Button variant="outlined" color="primary" onClick={handleBook} style={{float: 'right'}}>YES</Button>
                        <Button variant="outlined" color="secondary" onClick={(e)=>{setConfirm(false);}} style={{float: 'right', margin: '0 10px 10px 10px'}}>NO</Button>
                </ListItemText>
                </div>}
            </Paper>
        </ListItem>
    )
}

const baseUrl = 'http://localhost:8000';

export default function TimeSlotsBooking(props) {
    const classes = useStyles();
    const rows = props.rows;
    return (
        <React.Fragment>
            <List>
                {rows.time_slots.map(row => {
                    let a = true;
                    for (let j in row.bookings) {
                        let then = new Date(row.bookings[j].date)
                        if (props.date && then.getDate() == props.date.getDate() && then.getMonth() == props.date.getMonth())
                            a = false;
                    }
                    if (a)
                        return (
                            <RowComponent key={row.id} date={props.date} room={props.rows.name} timeslot={row} setDel={props.setDel}
                                          del={props.del}/>)
                })}
                {!rows.time_slots.length &&
                <Typography color="textSecondary" style={{textAlign: 'center'}}>No timeslots available!</Typography>}
            </List>


        </React.Fragment>
    );
}
