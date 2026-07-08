// Criar a div principal
export const barraSuperior = document.createElement("div");

barraSuperior.style.zIndex = 1000;
barraSuperior.className = "barra_superior";

// Botão de retorno
export const btnRetorno = document.createElement("div");//TODO botão antigo de retorno

// Título tipo de pizza
export const tipoPizza = document.createElement("h3");
tipoPizza.className = "tipo_pizza";

barraSuperior.appendChild(btnRetorno);
barraSuperior.appendChild(tipoPizza);