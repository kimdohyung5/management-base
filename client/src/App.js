
import './App.css';

import React, {useEffect, useState} from 'react'

import Customer from './components/Customer'

const customers = [
  {
    id: 1, image: 'https://place.img.com/64/64/1', name: '�赵��', birthday: '2011/1/1', gender: 'male', job: '�����'
  },
  {
    id: 2, image: 'https://place.img.com/64/64/2', name: '��쿵', birthday: '2011/2/1', gender: 'female', job: '�����'
  },{
    id: 3, image: 'https://place.img.com/64/64/3', name: '�輼��', birthday: '2011/3/1', gender: 'female', job: '�����'
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
