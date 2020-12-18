const express = require('express');
const router = express.Router();


const connection = require("./../connection")

router.get("/", (req, res) => {
    connection.query('SELECT * from customer', (error, rows) => {
        if (error) throw error;
        console.log('customer info is: ', rows);
        res.send( rows )
      });
})

module.exports = router;