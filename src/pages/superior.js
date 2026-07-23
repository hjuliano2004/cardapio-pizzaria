// Criar a div principal
export const barraSuperior = document.createElement("div");

barraSuperior.style.zIndex = 1000;
barraSuperior.className = "barra_superior";

// Botão de retorno
export const btnRetorno = document.createElement("div");//TODO botões de retorno devem ser colocados aqui

// Título tipo de pizza
export const tipoPizza = document.createElement("h3");//TODO: titulo das pizzas e titulo genérico da página de bebidas 
tipoPizza.className = "tipo_pizza";

export const div_carrinho = document.createElement("div");//TODO: botão do carrinho deve ser colocado aqui

barraSuperior.appendChild(btnRetorno);
barraSuperior.appendChild(tipoPizza);
barraSuperior.appendChild(div_carrinho);