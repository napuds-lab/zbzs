async function loadAssets() {
    const response = await fetch("http://localhost:8000/assets");
    const data = await response.json();

    const table = document.querySelector("#assetTable tbody");

    data.forEach(asset => {

        const row = `
            <tr>
                <td>${asset.asset_id}</td>
                <td>${asset.asset_name}</td>
                <td>${asset.description}</td>
                <td>${asset.quantity}</td>
                <td>${asset.price}</td>
            </tr>
            `;

        table.innerHTML += row;

    });

}

loadAssets();
