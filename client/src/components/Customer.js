
import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


const Customer = (props) => {
    const {customer} = props;
    return (
        <TableRow>
            <TableCell><img src={customer.image} alt="profile" /></TableCell>
            <TableCell>{`${customer.name}(${customer.id})`}</TableCell>
            <TableCell>{customer.birthday}</TableCell>
            <TableCell>{customer.gender}</TableCell>
            <TableCell>{customer.job}</TableCell>

        </TableRow>
    )
}

export default Customer;