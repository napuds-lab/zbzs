//validate
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

//รับค่า
const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

let conn; // เก็บ connection

const initMySQL = async () => {
    conn = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('connect to database');
}

app.post('/login', async (req, res) => {
    const { user, password } = req.body;

    const [rows] = await conn.query(
        'SELECT * FROM users WHERE user = ? AND password = ?', 
        [user, password]
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

async function submitData() {

    let user = document.querySelector('input[name="user"]').value;
    let password = document.querySelector('input[name="password"]').value;

    try {

        const response = await axios.post('http://localhost:8000/login', {
            user: user,
            password: password
        });

        let messageDOM = document.getElementById('message');

        if (response.data.status === "ok") {
            messageDOM.innerHTML = "เข้าสู่ระบบสำเร็จ";
        } else {
            messageDOM.innerHTML = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
        }

    } catch (error) {
        console.log(error);
    }

}

app.listen(port, async () => {
    await initMySQL();   // เชื่อม DB ก่อน
    console.log(`Server running at http://localhost:${port}`);
});