
async function login() {
    
    let user = document.querySelector('input[name="user"]').value;
    let password = document.querySelector('input[name="password"]').value;

    console.log('user:', user, 'password:', password);

    let messageDOM = document.getElementById('message');

    try {
        if (!user) {
            throw new Error('Username is required');
        }
        if (!password) {
            throw new Error('Password is required')
        }

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
            messageDOM.innerText = response.data.message || 'Login failed';
            messageDOM.className = 'message danger';
        }
    
    } catch (error) {
        const message = error.response?.data?.message || error.message || 'เกิดข้อผิดพลาด';
        const errors = error.response?.data?.errors || error.errors || [];

        let htmlData = `<div><div>${message}</div>`;
        if (errors.length) {
            htmlData += '<ul>';
            for (let i = 0; i < errors.length; i++) {
                htmlData += `<li>${errors[i]}</li>`;
            }
            htmlData += '</ul>';
        }
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger' ;
    }
}