import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
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
    }
}));

const baseUrl = `${process.env.REACT_APP_HOST_BASE_URL}`;

export default function AddRoomModal(props) {
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

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleDaysChange = (e) => {
        setDays(e.target.value);
    };

    const handleSubmit = () => {
        axios.post(baseUrl + '/rooms', {
            name,
            num_days_in_adv: days
        }, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then(() => {
            setOpen(false);
            props.setDel(!props.del);
        })
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon/>}
                onClick={handleOpen}
            >
                Add room
            </Button>
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
                        <h1 id="transition-modal-title" style={{textAlign: 'center'}}>Add Room</h1>
                        <FormGroup style={{alignItems: 'center'}}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name of the room"
                                name="name"
                                onChange={handleNameChange}
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
                        </FormGroup>
                    </Paper>
                </Fade>
            </Modal>
        </div>
    );
}
