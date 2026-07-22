export let cliente = load();

function load(){
    let cliente = localStorage.getItem("cliente");

    if(!cliente){return ""}

    return cliente;
}

export function saveCliente(string){
    cliente = string;
    localStorage.setItem("cliente", cliente);

}