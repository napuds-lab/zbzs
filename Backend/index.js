const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend/Pages/login')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/login.html'));
});

let conn;

const validateData = (userData) => {
    let errors = [];
    if (!userData.user) {
        errors.push('User is required');
    }
    if (!userData.password) {
        errors.push('Password is required');
    }
    return errors;
}

const initMySQL = async () => {
    if (!conn) {
        conn = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8700
        });
        console.log('connect to database');
    }
    return conn;
}

app.post('/login', async (req, res) => {
    try {
        const db = await initMySQL();
        const { user, password } = req.body;
        const [rows] = await db.query(
            'SELECT * FROM users WHERE user = ? AND password = ?', [user, password]
        );

        if (rows.length > 0) {
            const userRow = rows[0];
            console.log('userRow:', userRow); 
            const isAdmin = userRow.role == 1;

            res.json({
                status: "ok",
                message: "login success",
                isAdmin: isAdmin 
            });
        } else {
            res.json({
                status: "error",
                message: "user or password incorrect"
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Server error" });
    }
});

app.get('/assets', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM assets ');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/borrow', async (req, res) => {
    try {
        const [rows] = await conn.query('SELECT * FROM borrow ');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/register',async (req, res) => {
    try{let user = req.body;
        const errors = validateData(user);
        if (errors.length > 0){
            throw {
                message: 'กรุณากรอกให้ครบ',
                errors: errors
            }
        }
        const results = await conn.query('INSERT INTO users SET ?', user);
        console.log('results',results);
        res.json({
            message: 'บันทึกข้อมูลสำเร็จ',
            data: results[0]
        });
    }catch(error) {
        console.log('ejhae')
        const errormessage = error.message || 'Error creating user';
        const statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: errormessage,
            errors: error.errors || []
        });
    }
})

//put update status borrow



app.listen(port, async () => {
    await initMySQL();
    console.log(`Server running at http://localhost:${port}`);
});

