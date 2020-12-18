
const express = require('express');
const app = express();
const customers = require('./routes/customers');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const connection = require("./connection")

app.get("/", (req, res) => {
    res.send("home is called.");
})

app.use("/api/customers", customers);


const port = process.env.PORT || 5000;
app.listen( port, () => {
    console.log(` app is listening on port ${port} is listening.` )
})