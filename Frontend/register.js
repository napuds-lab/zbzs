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

const submitData = async () => {
    const userDOM = document.querySelector('input[name="user"]');
    const passwordDOM = document.querySelector('input[name="password"]');
    const messageDOM = document.getElementById('message');

    try {
        const userData = {
            user: userDOM.value,
            password: passwordDOM.value
        };

        const validationErrors = validateData(userData);
        if (validationErrors.length) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบ',
                errors: validationErrors
            };
        }

        const response = await axios.post('http://localhost:8000/register', userData);
        messageDOM.innerText = response.data.message || 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';
        window.location.href = 'login.html';

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
};



