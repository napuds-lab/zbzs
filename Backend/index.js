const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const initMySQL = async () => {
    conn = await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'webdb',
            port:8700
    });
    console.log('connect to database')
}

app.post('/login', async (req, res) => {
    const { user, password } = req.body;
    const [rows] = await initMySQL.query(
        'SELECT * FROM users WHERE user = ? AND password = ?', [user, password]
    );

    if (rows.length > 0) {
        res.json({
            status: "ok",
            message: "login success"
        });
    } else {
        res.json({
            status: "error",
            message: "user or password incorrect"
        });
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});