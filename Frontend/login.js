
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

async function login() {

    console.log('login successfully');
    
    let user = document.querySelector('input[name="user"]').value;
    let password = document.querySelector('input[name="password"]').value;

    console.log('user:', user, 'password:', password);

    let messageDOM = document.getElementById('message');

    try {
        const response = await axios.post('http://localhost:8000/login', {
            user: user,
            password: password
        });

        console.log('response:', response);
        console.log('role', response.data.isAdmin)
        if (response.data.status == "ok") {
            if (response.data.isAdmin) {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'main.html';
            }
        } else {
            messageDOM.innerHTML = "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง";
            messageDOM.className = 'message danger'
        }

    } catch (error) {
        console.log('error:', error);
    }
}
