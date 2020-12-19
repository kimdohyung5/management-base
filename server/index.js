
const express = require('express');
const app = express();


const customers = require('./routes/customers');
const connection = require("./connection")


app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/image', express.static('./upload'))


app.get("/", (req, res) => {
    res.send("home is called.");
})

app.use("/api/customers", customers);


const port = process.env.PORT || 5000;
app.listen( port, () => {
    console.log(` app is listening on port ${port} is listening.` )
})