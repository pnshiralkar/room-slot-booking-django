import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../../title.component';
import AddRoomModal from "./add-room-modal.component";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function NumRooms(props) {
    const classes = useStyles();
    let c = 0;
    for (let i in props.rooms)
        c += props.rooms[i].time_slots.length;
    return (
        <React.Fragment>
            <Title>Total Rooms</Title>
            <Typography component="p" variant="h4">
                {props.rooms.length}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {c} timeslot{c > 1 && 's'} in total
            </Typography>
            <div>

                <AddRoomModal {...props}/>
            </div>
        </React.Fragment>
    );
}
