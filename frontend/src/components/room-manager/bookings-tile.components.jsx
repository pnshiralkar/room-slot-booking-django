import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../title.component';
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
        cursor: 'pointer'
    },
});

function pad(num, size) {
    let s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

function dateOk(s, curr) {
    s = s.replace('-', '').replace('-', '');
    let sn = parseInt(s), d = new Date(), now;
    now = parseInt(pad(d.getFullYear(), 4) + pad(d.getMonth() + 1, 2) + pad(d.getDate(), 2));
    console.log(sn, now);

    if (curr === 'upcoming')
        return sn > now;
    else if (curr === 'past')
        return sn < now;
    else if (curr === 'today')
        return sn === now;
    else if (curr === 'all')
        return true;
}

export default function BookingsTile(props) {
    const classes = useStyles();

    const handleClick = (e) => {
        e.preventDefault();
        props.setCurr(props.curr);
    };

    let c = 0;
    for (let i in props.rooms)
        if (dateOk(props.rooms[i].date, props.curr))
            c++;

    return (
        <React.Fragment>
            <Title>{props.title}</Title>
            <br/>
            <Typography component="p" variant="h4">
                {c}
            </Typography>
            <br/><br/><br/><br/>
            <Typography color="textSecondary" className={classes.depositContext}>
                <Link href="" onClick={handleClick}> See all {props.title}</Link>
            </Typography>
        </React.Fragment>
    );
}
