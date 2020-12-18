
import './App.css';

import React, {useEffect, useState} from 'react'

import Customer from './components/Customer'

const customers = [
  {
    id: 1, image: 'https://place.img.com/64/64/1', name: '±èµµÇü', birthday: '2011/1/1', gender: 'male', job: '±â¼úÀÚ'
  },
  {
    id: 2, image: 'https://place.img.com/64/64/2', name: '±è¿ì¿µ', birthday: '2011/2/1', gender: 'female', job: '±â¼úÀÚ'
  },{
    id: 3, image: 'https://place.img.com/64/64/3', name: '±è¼¼À±', birthday: '2011/3/1', gender: 'female', job: '±â¼úÀÚ'
  }
]

function App() {
  const getData = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    console.log("body", body);
  }
  useEffect(() => {

    getData();
  }, [])

  return (
    <div className="gray-background">
      {
        customers.map( c => {
          console.log("c", c.name);
          return (<Customer key={c.id} customer={c}/> ) 
        })
      }
    
    </div>
  );
}

export default App;
