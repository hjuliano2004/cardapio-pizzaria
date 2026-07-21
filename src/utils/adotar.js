export function adotar(pai, filhos = []) {

    let i = 0;

    for (let i = 0; i < filhos.length; i++) {
        try{
             pai.appendChild(filhos[i]);
        }catch{
            console.log(`algo deu errado ${i+=1} vez, ${pai.innerHTML}`)
        }
    }

    return pai;
}


export function dom(tipo = "div", texto = "", attrs = {}) {
    const e = document.createElement(tipo);
    e.textContent = texto;

    for (const chave in attrs) {
        if (chave.startsWith("on") && typeof attrs[chave] === "function") {
            e.addEventListener(chave.slice(2).toLowerCase(), attrs[chave]);
        } else {
            e.setAttribute(chave, attrs[chave]);
        }
    }
    return e;
}


export function domNs(ns, tipo = "svg", texto = "", attrs = {}) {//se usa apenas pra criar svg
    const e = document.createElementNS(ns, tipo);
    if (texto) e.textContent = texto;
    for (const chave in attrs) {
        e.setAttribute(chave, attrs[chave]);
    }

    return e;
}




/* Exemplo de uso:
const container = dom("section", "", { id: "principal", class: "container" });
const titulo = dom("h1", "Bem-vindo!", { class: "titulo" });
const paragrafo = dom("p", "Este é um exemplo de uso.", { class: "texto" });
const botao = dom("button", "Clique aqui", { id: "btn1", class: "btn" });

adotar(container, [titulo, paragrafo, botao])
*/