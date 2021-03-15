require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./db/db_configuration.js');

app.use(express.static('public'))

app.get('/', (req, res) => {
    db.query("SELECT * FROM student;", (err, data) => {
        res.json(data.rows);
    })
})


app.listen(process.env.PORT, () => {
    console.log(`listening on Port ${process.env.PORT}`);
})

