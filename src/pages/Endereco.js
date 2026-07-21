import { root } from "../../script.js";
import { endereco, salveEndereco } from "../models/endereco.js";
import { adotar, dom } from "../utils/adotar.js";
import { bairroExiste, geraBairros } from "../utils/bairros.js";
import { requisicoes } from "../utils/requisicoes.js";
import { btn_retorno } from "../utils/Retorno.js";
import { barraSuperior, btnRetorno } from "./superior.js";

const retorno = btn_retorno("/#carrinho");

export function formulario() {
    // Cria elementos principais
    const section = dom("section", "", { id: "formulario" });

    const form = dom("form");
    const confirm = dom("button", "Confirmar", { type: "submit" });

    // Campos do formulário
    const rua = dom("input", "", { type: "text", name: "rua", placeholder: "Rua", value: endereco.rua, required: true });
    const labelRua = dom("label", "Rua:");

    const numero = dom("input", "", { type: "number", name: "numero", placeholder: "Número da casa", value: endereco.numero, required: true });
    const labelNumero = dom("label", "Número:");

    const cep = dom("input", "", { type: "text", name: "cep", placeholder: "CEP: endereço automatico", value: endereco.cep });
    const labelCep = dom("label", "Cep:");

    const bairro = dom("select", "", { id: "bairro" });
    const labelBairro = dom("label", "bairro");

    const complemento = dom("input", "", { type: "text", placeholder: "complemento", value: endereco.complemento });
    const labelComplemento = dom("label", "Complemento:");


    let padrao = dom("option", "selecione o bairro", { value: "" });

    cep.addEventListener("input", () => {
        porCep(rua, bairro, cep);
        cep.style.border = "";
    });

    autoSave(rua);
    autoSave(cep);
    autoSave(numero);
    autoSave(complemento);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!bairro.value) {
            bairro.style.border = "1px solid red";
            return;
        } else {
            bairro.style.border = "";
        }

        if (!validaBairro(cep, bairro, rua)) { return null }


    });

    confirm.addEventListener("click", () => {
        form.requestSubmit();
    })


    function autoSave(e) {
        e.addEventListener("input", () => {
            salveEndereco(rua.value, bairro.value, cep.value, numero.value, complemento.value);
        })
    }

    let divRua = dom("div", "")

    //adiciona os bairros disponiveis
    adotar(bairro, [padrao, ...geraBairros()]);

    bairro.value = endereco.bairro; //é necessário declarar o bairro salvo aqui pois os bairros são adicionados na linha anterior

    adotar(form, [adotar(dom("div", "", { class: "lacuna" }), [labelRua, rua]),
    adotar(dom("div", "", { class: "lacuna" }), [labelNumero, numero]),
    adotar(dom("div", "", { class: "lacuna" }), [labelBairro, bairro]),
    adotar(dom("div", "", { class: "lacuna" }), [labelCep, cep]),
    adotar(dom("div", "", { class: "lacuna" }), [labelComplemento, complemento])
    ])


    adotar(section, [form, confirm]);

    // Retorna a section pronta
    return section;
}

export function renderformEndereco() {
    root.innerText = "";
    root.appendChild(barraSuperior);
    root.appendChild(formulario());

    btnRetorno.innerText = "";
    btnRetorno.appendChild(retorno);
}

async function validaBairro(cep, bairro, rua) {

    let cepString = limpaTraco(`${cep.value}`);

    if (cepString.length < 8 || cepString.length > 8) {

        cep.style.border = "1px solid red";

        return null
    } else {
        cep.style.border = "";
    }

    let request = await requisicoes(`https://viacep.com.br/ws/${cepString}/json/`);

    if (request.bairro != bairro.value || request.logradouro != rua.value) {
        window.alert("o CEP não percente ao endereço");
        cep.style.border = "1px solid red";
    } else {
        cep.style.border = "";
    }

}


async function porCep(rua, bairro, cep) {

    let cepString = limpaTraco(`${cep.value}`)

    if (cepString.length < 8 || cepString.length > 8) { return null }

    let request = await requisicoes(`https://viacep.com.br/ws/${cepString}/json/`);

    try {
        if (bairroExiste(request.bairro)) {
            bairro.value = request.bairro;
            rua.value = request.logradouro;
            salveEndereco(rua.value, bairro.value, cep.value);
        }

    } catch (e) {
        console.log("não foi possivel autocompletar, bairro indisponível : ");
    }

}

function limpaTraco(cep) {
    let string = "";

    for (let i = 0; i < cep.length; i++) {
        if (!isNaN(cep[i])) {
            string = `${string}${cep[i]}`
        }
    }

    return string;
}