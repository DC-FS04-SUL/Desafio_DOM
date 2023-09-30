// "name": "Tonya Ritchie",
// "email": "Jasmin84@yahoo.com",
// "address": "12700 Renner Pine",
// "city": "Cathrynland",
// "state": "KS",
// "cep": "21734-8270",
// "phoneNumber": "808-948-6506"


const infor_clientes = '../clientes.json'


lerBaseDeDados = async () => {
  return await fetch(infor_clientes)
    .then((resultado) => resultado.json())
    .then((data) => data)
    .catch((error) => {
        console.log("lerBaseDeDados", error);
        return [];
    });
}

window.clientes = lerBaseDeDados();


addClienteTable = async (dados) => {
    const infor = await dados;
    let layout_tr = ``;
    console.log(infor);

    await infor.forEach( async (cliente, i) => {
        layout_tr +=

            ` 
            <tr>
            <th scope="row">${i}</th>
            <td>${cliente.name}</td>
            <td>${cliente.address}</td>
            <td>${cliente.email}</td>
            <td>${cliente.city}</td>
            <td>${cliente.state}</td>
            <td>${cliente.cep}</td>
            <td>${cliente.phoneNumber}</td>
            <td>
            </tr>

            <button id="editar-${i}" onclick="editar(this)" type="button" class="btn btn-primary">Editar</button>
            /
            <button id="deletar-${i}" onclick="editar(this)" type="button" class="btn btn-danger">Deletar</button>

            `

    })
    document.querySelector("tbody").innerHTML = layout_tr;
};

addClienteTable(window.clientes);

buscar = async () => {

    const text_name = document.getElementById("pesquisar").value.toLocaleLowerCase();
    const infor = await window.clientes;

    let filter_clientes = infor.filter((cliente) => cliente.name.toLocaleLowerCase().includes(text_name));
    await addClienteTable(filter_clientes);
}
deletar = async (e) => {
    console.log(e.id);
}