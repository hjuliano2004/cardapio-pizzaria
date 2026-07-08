// Criar a div principal
export const barraSuperior = document.createElement("div");

barraSuperior.style.zIndex = 1000;
barraSuperior.className = "barra_superior";

// Botão de retorno
export const btnRetorno = document.createElement("div");

// Título tipo de pizza
export const tipoPizza = document.createElement("h3");
tipoPizza.className = "tipo_pizza";

export const div_carrinho = document.createElement("div");

barraSuperior.appendChild(btnRetorno);
barraSuperior.appendChild(tipoPizza);
barraSuperior.appendChild(div_carrinho);