import 'date-fns';
import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import {FormGroup, FormHelperText, Paper, TextField} from "@material-ui/core";
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
import TimeSlots from "./TimeSlots";
import InfoIcon from "@material-ui/icons/Info";
import TimeSlotsBooking from "./TimeSlotsBooking";
import Profile from "./Profile";
import {Route} from "react-router-dom";
import FaceIcon from "@material-ui/icons/Face";
import PersonIcon from '@material-ui/icons/Person';

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
        width: '25%',
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
        margin: '44px 0px 0 ',
        transform: 'translateY(-50%)',
        cursor: 'pointer'
    },
}));

const baseUrl = 'http://localhost:8000';

export default function BookModal(props) {
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

    const [from, setFrom] = React.useState(new Date('2014-08-18T10:00:00'));
    const [to, setTo] = React.useState(new Date('2014-08-18T18:00:00'));
    const [errorText, setErrorText] = React.useState('');

    const handleFromChange = (e) => {
        setFrom(e);
    }

    const handleToChange = (e) => {
        setTo(e);
    }

    return (
        <div>
            {props.customer && <Button
                variant="contained"
                color="primary"
                className={classes.delRoom}
                startIcon={<FaceIcon/>}
                onClick={handleOpen}
            >
                View Customer
            </Button>}

            {props.roomManager && <Button
                variant="contained"
                color="primary"
                className={classes.delRoom}
                startIcon={<PersonIcon/>}
                onClick={handleOpen}
            >
                View Owner
            </Button>}
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
                        {/*<h1 id="transition-modal-title" style={{textAlign: 'center', marginBottom: '5px'}}>*/}
                        {/*    {props.cust && "Customer Profile"}*/}
                        {/*</h1>*/}
                        <div style={{
                            textAlign: 'center',
                            marginTop: '50px'
                        }}>
                            <div style={{
                                width: 'fit-content',
                                position: 'relative',
                                left: '50%',
                                transform: 'translateX(-50%)'
                            }}>
                                <Profile {...props}/>
                            </div>
                        </div>


                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}
