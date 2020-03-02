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
import {GridListTile, Input, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper} from "@material-ui/core";
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

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

function preventDefault(event) {
  event.preventDefault();
}

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
    axios.delete(baseUrl+'/rooms/'+room.id, {headers: {'Authorization': 'token ' + reactLocalStorage.get('token')}}).then((res) => {
      props.setDel(!props.del);
    })
  }

  return(
      <ListItem>
        <Paper className={classes.listPaper} >
          <ListItemText className={classes.roomTitle}>
            {!edit && <h3>{room.name}</h3>}
            {edit && <div><TextField type='text' placeholder={room.name} onChange={handleNameChange}/><br/><br/></div>}
          </ListItemText>
          <IconButton className={classes.delRoom} onClick={handleDel}>
            <DeleteIcon/>
          </IconButton>
          <IconButton className={classes.delRoom}>
            {!edit && <EditIcon onClick={handleEdit} />}
            {edit && <SaveIcon onClick={handleSave} />}
          </IconButton>
          <TimeSlotsModal/>
          <div className={classes.numDays}>
            {!edit && <h3 className={classes.numDaysH3}>{room.num_days_in_adv}</h3>}
            {edit && <div><Input type='number' placeholder={room.num_days_in_adv} onChange={handleDaysChange}/><br/></div>}
            days to book in advance
          </div>
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
      <Title>My Rooms</Title>

      <List>
        {rows.map(row => (
          <RowComponent key={row.id} room={row} setDel={props.setDel} del={props.del}/>
        ))}
        {!rows.length && <Typography color="textSecondary" style={{textAlign: 'center'}}>No rooms to display!</Typography>}
      </List>




    </React.Fragment>
  );
}
