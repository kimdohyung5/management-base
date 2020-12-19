
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

import Customer from './components/Customer'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing( 3 ),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
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

  useEffect( () => {
    const getData = async () => {

      const response = await fetch('/api/customers');
      const body = await response.json();
      setCustomers( body );
      console.log("body", body);
    }

    const setProgressInterval= () => {
      interval = setInterval( () => {
        setProgress( prev => prev + 2);
      }, 20)
    }
    getData();
    setProgressInterval();
  }, [])
  const headers = ['image','??','birthday', 'gender', 'Á÷¾÷'];

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

    return customers.map( c=> <Customer key={ c.id } customer ={c} /> );
    //const arrays = customers.map( c=> <Customer key={ c.id } customer ={c} /> )
    //return  arrays;
    
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        
        <TableHead>
          <TableRow>
            {headers.map( (h,index) => (<TableCell key={ index }>{h}</TableCell>))}
          </TableRow>
        </TableHead>

        <TableBody>
          {getTableBody()}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(App);
