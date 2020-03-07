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
    margin: '11px 10px'
  },
  roomName: {
    float: 'left',
    marginRight: '10%'
  },
  delRoom: {
    float: 'right',
    margin: '44px 0px 0 ',
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

function formatTime(s){
  let n = parseInt(s.split(':')[0]), ampm = ' AM';
  if(n>12){
    n -= 12;
    ampm = ' PM';
  }
  return n + ':' + s.split(':')[1] + ampm;
}

function RowComponent(props){
  const classes = useStyles();
  const [edit, setEdit] = React.useState(false);
  const [name, setName] = React.useState('');
  const [days, setDays] = React.useState('');
  const [room, setRoom] = React.useState(props.room);

  const handleEdit = (e)=>{
    e.preventDefault();
    setEdit(true);
  };

  const handleSave = (e)=>{
    e.preventDefault();
    console.log(name.length)
    let data = {}
    if(name.length)
      data.name = name;
    if(days.length)
      data.num_days_in_adv = days;
    axios.patch(baseUrl+'/rooms/'+room.id, data, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
      setRoom(res.data);
    })
    setEdit(false);
  }

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  const handleDaysChange = (e) => {
    e.preventDefault();
    setDays(e.target.value);
  }

  const handleDel = (e) => {
    e.preventDefault();
    axios.delete(baseUrl+'/bookings/'+props.booking.id, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
      props.setDel(!props.del);
    })
  }

  const deletable = (s)=>{
    s = s.replace('-', '').replace('-', '');
    let sn = parseInt(s), d = new Date(), now;
    now = parseInt(pad(d.getFullYear(), 4) + pad(d.getMonth()+1, 2) + pad(d.getDate(), 2));

    return sn >= now;
  }

  return(
      <ListItem>
        <Paper className={classes.listPaper} >
          <ListItemText className={classes.roomName}>
            <Grid style={{textAlign: 'center'}}>
              <h3 style={{marginBottom: '5px'}}>{props.booking.time_slot.room_id.name}</h3>
              <FormHelperText style={{margin: '2px', textAlign: 'center'}}>Room</FormHelperText>
            </Grid>
          </ListItemText>
          <ListItemText className={classes.roomTitle}>
            <Grid style={{textAlign: 'center'}}>
              <h3 style={{marginBottom: '5px'}}>{(props.booking.date)}</h3>
            </Grid>
          </ListItemText>
          <ListItemText className={classes.roomTitle}>
            <Grid style={{textAlign: 'center'}}>
              <h3 style={{marginBottom: '5px'}}>{formatTime(props.booking.time_slot.time_from)}</h3>
            </Grid>
          </ListItemText>
          <FormHelperText className={classes.roomTitle} style={{marginTop: '19px'}}><h3>to</h3></FormHelperText>
          <ListItemText className={classes.roomTitle}>
            <Grid style={{textAlign: 'center'}}>
              <h3 style={{marginBottom: '5px'}}>{formatTime(props.booking.time_slot.time_to)}</h3>
            </Grid>
          </ListItemText>
          {deletable(props.booking.date) && <IconButton className={classes.delRoom} onClick={handleDel}>
            <DeleteIcon/>
          </IconButton>}
        </Paper>
      </ListItem>
  )
}

function pad(num, size) {
  var s = num+"";
  while (s.length < size) s = "0" + s;
  return s;
}

function dateOk(s, curr){
  s = s.replace('-', '').replace('-', '');
  let sn = parseInt(s), d = new Date(), now;
  now = parseInt(pad(d.getFullYear(), 4) + pad(d.getMonth()+1, 2) + pad(d.getDate(), 2));
  console.log(sn, now);

  if(curr == 'upcoming')
    return sn > now;
  else if(curr == 'past')
    return sn < now;
  else if(curr == 'today')
    return sn == now;
  else if(curr == 'all')
    return true;
}

const baseUrl = 'http://localhost:8000';

export default function Bookings(props) {
  const classes = useStyles();

  let c=0;
  for(let i in props.rows)
    if(dateOk(props.rows[i].date, props.curr))
      c++;

  let title;
  if(props.curr == 'upcoming')
      title='Upcoming Bookings';
  else if(props.curr == 'past')
    title='Past Bookings';
  else if(props.curr == 'today')
    title='Today\'s Bookings';
  else if(props.curr == 'new')
    title='New Booking';
  else if(props.curr == 'all')
    title='All Bookings';
  const rows = props.rows;
  return (
    <React.Fragment>
      <Title>{title}</Title>

      <List>
        {rows.map(row => {
          if (dateOk(row.date, props.curr))
            return (<RowComponent curr={props.curr} key={row.id} booking={row} setDel={props.setDel} del={props.del}/>)
        })}
        {!c && <Typography color="textSecondary" style={{textAlign: 'center'}}>No bookings to display!</Typography>}
      </List>




    </React.Fragment>
  );
}
