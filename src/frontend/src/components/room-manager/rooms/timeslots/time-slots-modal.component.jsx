import 'date-fns';
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import {FormGroup, FormHelperText, Paper} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Typography from "@material-ui/core/Typography";
import {KeyboardTimePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import TimeSlots from "./time-slots.component";

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 5, 4),
        width: '35%',
    },
    closeBtn: {
        float: 'right',
        padding: '0'
    },
    timeslotsIcon: {
        float: 'right',
        margin: '33px 0px 0 ',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    },
}));

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

export default function TimeSlotsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [from, setFrom] = React.useState(new Date('2014-08-18T10:00:00'));
    const [to, setTo] = React.useState(new Date('2014-08-18T18:00:00'));
    const [errorText, setErrorText] = React.useState('');
    const [del, setDel] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    const handleSubmit = () => {
        console.log(from.toTimeString().split(' '));
        axios.post(baseUrl + '/timeslots', {
            time_from: from.toTimeString().split(' ')[0],
            time_to: to.toTimeString().split(' ')[0],
            room_id: props.roomId
        }, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then(() => {
            setDel(!del);
            props.setDel(!props.del);
        }).catch(e => {
            let err = '';
            let data = e.response.data;
            for (let d in data)
                for (let i in data[d])
                    err += data[d][i];
            setErrorText(err);
        })
    };

    useEffect(() => {
        axios.get(baseUrl + '/timeslots?room_id=' + props.roomId, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            setRows(res.data);
        })
    }, [del]);

    const handleFromChange = (e) => {
        setFrom(e);
    };

    const handleToChange = (e) => {
        setTo(e);
    };

    return (
        <div>
            <IconButton
                className={classes.timeslotsIcon}
                onClick={handleOpen}
            >
                <QueryBuilderIcon/>
            </IconButton>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Paper className={classes.paper}>
                        <IconButton className={classes.closeBtn} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                        <h1 id="transition-modal-title" style={{textAlign: 'center', marginBottom: '5px'}}>Manage
                            TimeSlots</h1>
                        <Typography color='textSecondary' style={{
                            textAlign: 'center',
                            marginBottom: '30px'
                        }}>for {props.roomName} room </Typography>

                        {rows.map((row, ind) => {
                            return (
                                <TimeSlots key={row.id} rows={[{
                                    sr: ind + 1,
                                    id: row.id,
                                    time_from: row.time_from,
                                    time_to: row.time_to
                                }]} del={del} setDel={setDel} delP={props.del} setDelP={props.setDel}/>
                            )
                        })}


                        <FormGroup style={{alignItems: 'center'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Time From"
                                    value={from}
                                    onChange={handleFromChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                                <KeyboardTimePicker
                                    margin="normal"
                                    id="time-picker"
                                    label="Time To"
                                    value={to}
                                    onChange={handleToChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                            <FormHelperText error>{errorText}</FormHelperText><br/>
                            <Button variant="contained" style={{width: '50%'}} color="primary" onClick={handleSubmit}>
                                Add Slot
                            </Button>
                        </FormGroup>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}
