const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const cors = require('cors');

app.use(cors());

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
app.use(bodyParser.json());


app.get('/testdb-new',async (req, res) => {
        try{
            const conn = await mysql.createConnection({
            host:'localhost',
            user:'root',
            password:'root',
            database:'webdb',
            port:8700
        });
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0])
        } catch (err) {
    console.error('Error',err);
    res.status(500).json({error:'Data faild'})
    }
});

//get
app.get('/users',async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
})

//post
app.post('/users',async (req, res) => {
        let user = req.body;
        const results = await conn.query('INSERT INTO users SET ?', user);
        console.log('results',results);
        res.json({
            message: 'user',
            data: results[0]
        });
})

app.get('/users/:id',async (req, res) => {
    try{

    }catch{
        console.error('Error',error);
        letsta
    }
    let id = req.params.id;
    const results = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
    res.json(results[0]);
})

app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        let updatedUser = req.body;
        const results = await conn.query('UPDATE users SET ? WHERE id = ?', [updatedUser, id])
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }
        res.json({
            message: 'User updated successfully',
            data: updatedUser
        });
    }
    catch (error) {
        console.error('Error updating user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error updating user',
            error: error.message
        });
    }
})

//deleted
app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id
        const results = await conn.query('DELETE FROM users WHERE id = ?', id)
        if (results[0].affectedRows == 0) {
            throw { statusCode: 404, message: 'User not found' };
        }   
        res.json({
            message: 'User deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting user:', error.message);
        let statusCode = error.statusCode || 500;
        res.status(statusCode).json({
            message: 'Error deleting user',
            error: error.message
        });
    }
})

//app.put('/users/:id', async (req, res) => {
//    let id = req.params.id;
//    let updateUser = req.body;
//    const results = await conn.query('UPDATE users SET ?'.[updateUser,id]);
//    res.json({
//        message: 'user suc',
 //       data: results[0]
  //  })
//})

//app.post('/user', (req, res) => {
 //   let user = req.body;
 //   user.id=counter
 //   counter+=1;

 //   users.push(user);
 //   res.json({
 //   message: 'User added successful',
//    user: user
//    });
//});

app.patch('/user/:id', (req,res)=>{
    let id = req.params.id;
    let updateUser = req.body;

    //  หา user ที่จาก id ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);

    // อัพเดตข้อมูล users
    users[selectedIndex].firstname = updateUser.firstname || users[selectedIndex].firstname;
    users[selectedIndex].lastname = updateUser.lastname || users[selectedIndex].lastname;

    if(updateUser.firstname){
        users[selectedIndex].firstname = updateUser.firstname;
    }
    if(updateUser.lastname){
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User update successful',
        data: {
            user: updateUser,
            indexUpdate: selectedIndex
        }
    });
});
    //ส่ง users ที่อัพเดตแล้วกลับไป
app.delete('/users/:id',(req, res) => {
    let id = req.params.id;
    //หา index จาก id ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    users.splice(selectedIndex, 1);
    //ลบ user ออกจาก users
    res.json({
            message: 'User deleted successful',
            indexDelete: selectedIndex
    });
});
app.listen(port,async ()=> {
    await initMySQL();
    console.log(`Server is running on http://localhost:${port}`);
});