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

    await infor.forEach(async (cliente, i) => {
        layout_tr +=

            ` 
            <tr>
            <th scope="row">${i}</th>
            <td>${cliente.name}</td>
            <td>${cliente.address}</td>
            <td id="email-${i}">${cliente.email}</td>
            <td>${cliente.city}</td>
            <td>${cliente.state}</td>
            <td>${cliente.cep}</td>
            <td>${cliente.phoneNumber}</td>
            <td>
            </tr>

            <button id="editar-${i}" onclick="editar(this)" type="button" class="btn btn-primary">Editar</button>
            
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
};
showModal = () => {
    let meuModal = new bootstrap.Modal(document.getElementById("infor"));
    meuModal.show();
}

deletar = async (e) => {
    console.log(e.id);

    showModal();
};

editar = async (e) => {
    const ID = parseInt(e.id.split("editar-")[1]);
    const infor = await window.clientes;

    // Filtrar pelo email

    const EMAIL_INFOR = document.getElementById(`email-${ID}`).innerHTML;

    let filter_clientes = infor.filter((cliente) =>
        cliente.email === EMAIL_INFOR
    );


    const NAME = document.getElementById("infor-name");
    const EMAIL = document.getElementById("infor-email");
    const ADDRESS = document.getElementById("infor-address");
    const CITY = document.getElementById("infor-city");
    const STATE = document.getElementById("infor-state");
    const CEP = document.getElementById("infor-cep");
    const PHONE_NUMBER = document.getElementById("infor-phoneNumber");

    NAME.value = filter_clientes[0].name;
    EMAIL.value = filter_clientes[0].email;
    ADDRESS.value = filter_clientes[0].address;
    CITY.value = filter_clientes[0].city;
    STATE.value = filter_clientes[0].state;
    CEP.value = filter_clientes[0].cep;
    PHONE_NUMBER.value = filter_clientes[0].phoneNumber;

    const ENVIAR = document.getElementById("enviar")
    ENVIAR.innerHTML = "Alterar";
    ENVIAR.setAttribute("data-type", "editar");

    const TITLE = document.getElementById("infor-title")
    TITLE.innerHTML = `Editar: ${filter_clientes[0].name}`
    showModal();
};

