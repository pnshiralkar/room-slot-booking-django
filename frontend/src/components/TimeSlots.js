import React, {useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {
  FormHelperText,
  GridListTile,
  Input,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Paper
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import SaveIcon from '@material-ui/icons/Save';
import axios from "axios";
import {reactLocalStorage} from "reactjs-localstorage";
import Typography from "@material-ui/core/Typography";
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import IconButton from "@material-ui/core/IconButton";
import TimeSlotsModal from "./TimeSlotsModal";

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  listPaper: {
    width: '100%',
    padding: '0 2%'
  },
  roomTitle: {
    float: 'left',
    margin: '5px'
  },
  roomSr: {
    float: 'left',
    margin: '5px',
    marginRight: '20px'
  },
  delRoom: {
    float: 'right',
    margin: '33px 0px 0 ',
    transform: 'translateY(-50%)',
    cursor: 'pointer'
  },
  numDays: {
    float: 'right',
    margin: '0px 10% 0 0',
    transform: 'translateY(-10%)',
    textAlign: 'center',
    cursor: 'pointer'
  },
  numDaysH3: {
    marginBottom: '5px'
  }
}));

function RowComponent(props){
  const classes = useStyles();
  let ampmFrom = ' AM', ampmTo = ' AM';
  let from = parseInt(props.timeslot.time_from.split(':')[0]), to = parseInt(props.timeslot.time_to.split(':')[0]);
  if(from>12){
    from -= 12;
    ampmFrom = ' PM';
  }
  if(to>12){
    to -= 12;
    ampmTo = ' PM';
  }


  const handleDel = (e) => {
    e.preventDefault();
    axios.delete(baseUrl+'/timeslots/'+props.timeslot.id, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
      props.setDel(!props.del);
    })
  }

  return(
      <ListItem>
        <Paper className={classes.listPaper} >
          <ListItemText className={classes.roomSr}>
            <h3>{props.sr}</h3>
          </ListItemText>
          <ListItemText className={classes.roomTitle}>
            <h3>{from + ':' + props.timeslot.time_from.split(':')[1] + ampmFrom}</h3>
          </ListItemText>
          <FormHelperText className={classes.roomTitle} style={{marginTop: '12px'}}><h3>to</h3></FormHelperText>
          <ListItemText className={classes.roomTitle}>
            <h3>{to + ':' + props.timeslot.time_to.split(':')[1] + ampmTo}</h3>
          </ListItemText>
          <IconButton className={classes.delRoom} onClick={handleDel}>
            <DeleteIcon/>
          </IconButton>
        </Paper>
      </ListItem>
  )
}

const baseUrl = 'http://localhost:8000';

export default function Rooms(props) {
  const classes = useStyles();
  const rows = props.rows;
  return (
    <React.Fragment>
      <List>
        {rows.map(row => (
          <RowComponent sr={row.sr} timeslot={row} setDel={props.setDel} del={props.del}/>
        ))}
        {!rows.length && <Typography color="textSecondary" style={{textAlign: 'center'}}>No timeslots to display!</Typography>}
      </List>




    </React.Fragment>
  );
}
