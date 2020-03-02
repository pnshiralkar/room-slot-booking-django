import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {FormGroup, Paper, TextField} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import Typography from "@material-ui/core/Typography";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 5, 4),
        width: '35%',
    },
    numField: {
        padding: '10px',
        marginBottom: '20px'
    },
    closeBtn: {
        float: 'right',
        padding: '0'
    },
    delRoom: {
        float: 'right',
        margin: '33px 0px 0 ',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    },
}));

const baseUrl = 'http://localhost:8000';

export default function TimeSlotsModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [name, setName] = React.useState('');
    const [days, setDays] = React.useState(0);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = date => {
        setSelectedDate(date);
    };

    const handleDaysChange = (e) => {
        setDays(e.target.value);
    }

    const handleSubmit = (e) => {
        axios.post(baseUrl + '/rooms', {name, num_days_in_adv: days}, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
            setOpen(false);
            props.setDel(!props.del);
        })
    }

    return (
        <div>
            <IconButton
                className={classes.delRoom}
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
                        <IconButton className={classes.closeBtn}>
                            <CloseIcon onClick={handleClose}/>
                        </IconButton>
                        <h1 id="transition-modal-title" style={{textAlign: 'center', marginBottom: '5px'}}>Manage TimeSlots</h1>
                        <Typography color='textSecondary' style={{textAlign: 'center', marginBottom: '30px'}}>for Room 1</Typography>
                        <FormGroup style={{alignItems: 'center'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time picker"
                                value={selectedDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                            <Input
                                type='number'
                                className={classes.numField}
                                onChange={handleDaysChange}
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name of the room"
                                name="name"
                                placeholder="Max days to book in advance"
                            /><br/>
                            <Button variant="contained" style={{width: '50%'}} color="primary" onClick={handleSubmit}>
                                Add Room
                            </Button>
                            </MuiPickersUtilsProvider>
                        </FormGroup>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}
