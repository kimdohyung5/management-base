const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer({dest: './upload'})


const connection = require("../connection")

router.get("/", (req, res) => {
    connection.query('SELECT * from customer where isDeleted = 0 ', (error, rows) => {
        if (error) throw error;
        console.log('customer info is: ', rows);
        res.send( rows )
      });
})

router.post("/", upload.single('image'), (req, res) => {
  let sql = 'insert into customer values(null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  console.log("req.body", req.body);

  const params = [ image, req.body.name, req.body.birthday, req.body.gender, req.body.job]

  connection.query(sql, params, (err, rows, fields) => {
    if( err ) {
      console.log("err", err);
    } else {
      res.send( rows );
    }
  })
})

router.delete("/:id", (req, res) => {
  const sql = 'update customer set isDeleted = 1 where id=?';
  let params = [req.params.id];

  console.log("delete, params", params);

  connection.query(sql, params, (err, rows, fields) => {
    if( err ) {
      console.log("err", err);
    }
    res.send(rows);
  })
})

module.exports = router;