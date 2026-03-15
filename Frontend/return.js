const modal = document.getElementById('confirmModal');
const openBtn = document.getElementById('openModal');
const cancelBtn = document.getElementById('cancelBtn');
async function loadBorrow(){
        const response = await fetch("http://localhost:8000/return");
        const data = await response.json();

        const table = document.querySelector("#borrowTable tbody");

        data.forEach(asset => {

            const row = `
            <tr>
                <td>${asset.asset_id}</td>
                <td>${asset.asset_code}</td>
                <td>${asset.asset_name}</td>
                <td>${asset.description}</td>
                <td>${asset.price}</td>
                <td><button onclick="return(${asset.asset_id})">Return</button></td>

            </tr>
            `;

            table.innerHTML += row;

        });

    }

    function clicked() {
        modal.showModal();
    }

    async function return(id){
    const response = await axios.put(`http://localhost:8000/return/${id}`);
    window.location.reload(); 
}
    
    loadBorrow();