require('dotenv').config()
const express = require('express');
const pool = require('./db/db_configuration.js');
const app = express();
const db = require('./db/db_configuration.js');

app.use(express.static('public'))

app.get('/api/students', async(req, res) => {
    const client = await pool.connect
    client.query("SELECT * FROM student", (err, data) => {
        res.json(data.rows);
        client.release();
    })
})


app.listen(process.env.PORT, () => {
    console.log(`listening on Port ${process.env.PORT}`);
})

