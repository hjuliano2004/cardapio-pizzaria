import { rendLista } from "./pizza.js";
import { horario } from "./scr/horas.js";
import { previa } from "./scr/prevPagamentos.js";

export let editar = {pizza: 0};
export let inicio = document.getElementById("inicio");
export let bebidas = document.getElementById("bebidas");
export let sabores = document.getElementById("sabores");

horario();

previa();

rendLista();