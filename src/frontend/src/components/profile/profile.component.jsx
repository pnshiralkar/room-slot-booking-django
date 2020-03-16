import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 305,
    },
    media: {
        height: 140,
    },
});

export default function Profile(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardMedia
                className={classes.media}
                image={props.imgLink}
                title="Customer"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography variant="h6" color="textSecondary" component="p">
                    Username : {props.username}
                </Typography>

                <Typography variant="h6" color="textSecondary" component="p">
                    Email : {props.email}
                </Typography>

            </CardContent>
        </Card>
    );
}