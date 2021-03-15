require('dotenv').config()
const express = require('express');
const pool = require('./db/db_configuration.js');
const app = express();

app.use(express.static('public'))

app.get('/api/students', async(req, res) => {
    try {
        const client = await pool.connect
        const students = pool.query("SELECT * FROM student", (err, data) => {
            res.json(data.rows);
            client.release();
        })
    }
        catch (error) {
        res.end('boop')
    }
})


app.listen(process.env.PORT, () => {
    console.log(`listening on Port ${process.env.PORT}`);
})

