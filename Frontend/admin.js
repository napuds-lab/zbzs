const submitData = async () => {
    const asset_codeDOM = document.querySelector('input[name="asset_code"]');
    const asset_nameDOM = document.querySelector('input[name="asset_name"]');
    const category_idDOM = document.querySelector('input[name="category_id"]');
    const priceDOM = document.querySelector('input[name="price"]');
    const descriptionDOM = document.querySelector('input[name="description"]');
    const messageDOM = document.getElementById('message');
//oejgh
    try {
        const userData = {
            asset_code: asset_codeDOM.value,
            asset_name: asset_nameDOM.value,
            category_id: category_idDOM.value,
            price: priceDOM.value,
            description: descriptionDOM.value
        };

        const response = await axios.post('http://localhost:8000/assets', userData);
        messageDOM.innerText = response.data.message || 'บันทึกข้อมูลสำเร็จ';
        messageDOM.className = 'message success';

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



