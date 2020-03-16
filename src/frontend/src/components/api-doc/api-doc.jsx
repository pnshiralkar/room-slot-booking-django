import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

export default function ApiDoc(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <SwaggerUI url="/api-doc.json" docExpansion={'none'}/>
            </main>
        </div>
    );
}