
import React from 'react';

const Customer = (props) => {
    const {customer} = props;
    return (
        <div>
            <h1>{customer.name}</h1>
            <h2>{customer.image}</h2>
        </div>
    )
}

export default Customer;