
import './App.css';

import React, {useEffect, useState} from 'react'

import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import CircularProgress from '@material-ui/core/CircularProgress'
import {withStyles} from '@material-ui/core/styles'


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';



import Customer from './components/Customer'
import CustomerAdd from './components/CustomerAdd'

const styles = theme => ({
  root: {
    width: '100%',
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  },
  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  tableHead: {
    fontSize: '1.0rem'
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display:'flex',
    justifyContent: 'center'
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
})



// const customers = [
//   {
//     id: 1, image: 'https://place.img.com/64/64/1', name: '±èµµÇü', birthday: '2011/1/1', gender: 'male', job: '±â¼úÀÚ'
//   },
//   {
//     id: 2, image: 'https://place.img.com/64/64/2', name: '±è¿ì¿µ', birthday: '2011/2/1', gender: 'female', job: '±â¼úÀÚ'
//   },{
//     id: 3, image: 'https://place.img.com/64/64/3', name: '±è¼¼À±', birthday: '2011/3/1', gender: 'female', job: '±â¼úÀÚ'
//   }
// ]

let interval;

function App(props) {

  const {classes } = props;
  const [progress, setProgress] = useState(0);
  const [customers, setCustomers] = useState();
  const [searchKeyword, setSearchKeyword] = useState('');

  const getData = async () => {

    const response = await fetch('/api/customers');
    const body = await response.json();
    setCustomers( body );
    console.log("body", body);
  }

  const refreshCustomerData = () => {
    getData();
  }

  useEffect( () => {
    

    const setProgressInterval= () => {
      interval = setInterval( () => {
        setProgress( prev => prev + 2);
      }, 20)
    }
    getData();
    setProgressInterval();
  }, [])
  const headers = ['image','??','birthday', 'gender', 'Á÷¾÷', 'delete'];

  const getTableBody = () => {
    //console.log("customers", customers);
    
    if( !customers ) {
      return ( 
        <TableRow>
          <TableCell  colSpan="5" align="center">
            <CircularProgress className={classes.progress} variant="determinate" value={progress}/>
          </TableCell>
        </TableRow>
      )
    }
    clearInterval( interval );

    const filteredCustomer = customers.filter( c => c.name.indexOf( searchKeyword ) > -1 )

    return filteredCustomer.map( c=> <Customer key={ c.id } customer ={c}  onRefresh={refreshCustomerData}/> );
    //const arrays = customers.map( c=> <Customer key={ c.id } customer ={c} /> )
    //return  arrays;
    
  }
  const handleSearchKeyword = (e) => {
    setSearchKeyword( e.target.value );
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            ?? ?? ??? 
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="????"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={searchKeyword}
              onChange={handleSearchKeyword}
            />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd onRefresh={refreshCustomerData} />
      </div>
      <Paper className={classes.paper}>
        <Table >
          
          <TableHead>
            <TableRow>
              {headers.map( (h,index) => (<TableCell className={classes.tableHead} key={ index }>{h}</TableCell>))}
            </TableRow>
          </TableHead>

          <TableBody>
            {getTableBody()}
          </TableBody>
        </Table>
      </Paper>
      
    </div>
  );
}

export default withStyles(styles)(App);
