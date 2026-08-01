export let cliente = load();
export let comentario = loadComentario();

function load() {
    let cliente = localStorage.getItem("cliente");

    if (!cliente) { return "" }

    return cliente;
}
function loadComentario() {
    let string = localStorage.getItem("comentario");

    if (string) {
        return string;
    }

    return "";

}

export function saveCliente(string) {
    cliente = string;
    localStorage.setItem("cliente", cliente);
}

export function saveComentario(string) {

    comentario = string

    localStorage.setItem("comentario", comentario);
}