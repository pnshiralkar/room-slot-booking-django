import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText, Paper} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles(theme => ({
    listPaper: {
        width: '100%',
        padding: '0 2%'
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
    delTimeSlot: {
        float: 'right',
        margin: '33px 0px 0 ',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    },
}));

function RowComponent(props) {
    const classes = useStyles();
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


    const handleDel = (e) => {
        e.preventDefault();
        axios.delete(baseUrl + '/timeslots/' + props.timeslot.id, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then(() => {
            props.setDel(!props.del);
            props.setDelP(!props.delP);
        })
    };

    return (
        <ListItem>
            <Paper className={classes.listPaper}>
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
                <IconButton className={classes.delTimeSlot} onClick={handleDel}>
                    <DeleteIcon/>
                </IconButton>
            </Paper>
        </ListItem>
    )
}

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

export default function TimeSlots(props) {
    const rows = props.rows;
    return (
        <React.Fragment>
            <List>
                {rows.map(row => (
                    <RowComponent key={row.id} sr={row.sr} timeslot={row} setDel={props.setDel} del={props.del}
                                  delP={props.delP} setDelP={props.setDelP}/>
                ))}
                {!rows.length &&
                <Typography color="textSecondary" style={{textAlign: 'center'}}>No timeslots to display!</Typography>}
            </List>
        </React.Fragment>
    );
}
