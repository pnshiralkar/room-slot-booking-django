import 'date-fns';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import {Paper} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InfoIcon from "@material-ui/icons/Info";
import TimeSlotsBooking from "./time-slots.component";

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


export default function BookModal(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <IconButton
                className={classes.delRoom}
                onClick={handleOpen}
            >
                <InfoIcon/>
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
                        <h1 id="transition-modal-title" style={{textAlign: 'center', marginBottom: '5px'}}>Pick a
                            TimeSlot to Book</h1>
                        <Typography color='textSecondary' style={{
                            textAlign: 'center',
                            marginBottom: '30px'
                        }}>for {props.rows.name} room </Typography>
                        {console.log(props.rows)}
                        <TimeSlotsBooking
                            date={props.date}
                            rows={props.rows}
                            del={props.del} setDel={props.setDel}/>


                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}
