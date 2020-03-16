import 'date-fns';
import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from "@material-ui/core/Button";
import {Paper} from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import IconButton from "@material-ui/core/IconButton";
import Profile from "./profile.component";
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
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 5, 4),
        width: '25%',
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
