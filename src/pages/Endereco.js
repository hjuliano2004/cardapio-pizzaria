import { root } from "../../script.js";
import { adotar, dom } from "../utils/adotar.js";
import { geraBairros } from "../utils/bairros.js";

export function formulario() {
    // Cria elementos principais
    const section = dom("section", "", { id: "formulario" });

    const form = dom("form");
    const confirm = dom("button", "Confirmar", { type: "submit" });

    // Campos do formulário
    const rua = dom("input", "", { type: "text", name: "rua", placeholder: "Rua" });
    const numero = dom("input", "", { type: "number", name: "numero", placeholder: "Número da casa" });
    const cep = dom("input", "", { type: "text", name: "cep", placeholder: "CEP" });
    const bairro = dom("select", "", { id: "bairro" });

    let padrao = dom("option", "selecione o bairro", {value: ""})

    //adiciona os bairros disponiveis
    adotar(bairro, [padrao, ...geraBairros()]);
    // Adiciona os campos ao formulário
    adotar(form, [rua, numero, bairro, cep]);
    // Adiciona form e botão à section
    adotar(section, [form, confirm]);

    // Retorna a section pronta
    return section;
}

export function renderformEndereco() {
    root.innerText = "";
    let form = root.appendChild(formulario());
}