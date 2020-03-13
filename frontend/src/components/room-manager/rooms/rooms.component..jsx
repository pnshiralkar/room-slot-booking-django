import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Title from '../../title.component';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {Input, ListItemText, Paper} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TimeSlotsModal from "./timeslots/time-slots-modal.component";

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
    listPaper: {
        width: '100%',
        padding: '0 2%'
    },
    roomTitle: {
        float: 'left',
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

function RowComponent(props) {
    const classes = useStyles();
    const [edit, setEdit] = React.useState(false);
    const [name, setName] = React.useState('');
    const [days, setDays] = React.useState('');
    const [room, setRoom] = React.useState(props.room);

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log(name.length);
        let data = {};
        if (name.length)
            data.name = name;
        if (days.length)
            data.num_days_in_adv = days;
        axios.patch(baseUrl + '/rooms/' + room.id, data, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            setRoom(res.data);
        });
        setEdit(false);
    };

    const handleNameChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleDaysChange = (e) => {
        e.preventDefault();
        setDays(e.target.value);
    };

    const handleDel = (e) => {
        e.preventDefault();
        axios.delete(baseUrl + '/rooms/' + room.id, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then(() => {
            props.setDel(!props.del);
        })
    };

    return (
        <ListItem>
            <Paper className={classes.listPaper}>
                <ListItemText className={classes.roomTitle}>
                    {!edit && <h3>{room.name}</h3>}
                    {edit &&
                    <div><TextField type='text' placeholder={room.name} onChange={handleNameChange}/><br/><br/></div>}
                </ListItemText>
                <IconButton className={classes.delRoom} onClick={handleDel}>
                    <DeleteIcon/>
                </IconButton>
                {!edit && <IconButton className={classes.delRoom} onClick={handleEdit}>
                    <EditIcon/>
                </IconButton>}
                {edit && <IconButton className={classes.delRoom} onClick={handleSave}>
                    <SaveIcon/>
                </IconButton>}
                <TimeSlotsModal roomId={room.id} roomName={room.name} setDel={props.setDel} del={props.del}/>
                <div className={classes.numDays}>
                    {!edit && <h3 className={classes.numDaysH3}>{room.num_days_in_adv}</h3>}
                    {edit && <div><Input type='number' placeholder={room.num_days_in_adv.toString()}
                                         onChange={handleDaysChange}/><br/></div>}
                    days to book in advance
                </div>
            </Paper>
        </ListItem>
    )
}

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

export default function Rooms(props) {
    const rows = props.rows;
    return (
        <React.Fragment>
            <div style={{textAlign: 'left'}}><Title>My Rooms</Title></div>

            <List>
                {rows.map(row => (
                    <RowComponent key={row.id} room={row} setDel={props.setDel} del={props.del}/>
                ))}
                {!rows.length &&
                <Typography color="textSecondary" style={{textAlign: 'center'}}>No rooms to display!</Typography>}
            </List>
        </React.Fragment>
    );
}
