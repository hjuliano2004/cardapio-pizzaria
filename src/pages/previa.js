import { root } from "../../script.js";
import { adotar, dom, domNs } from "../utils/adotar.js";

// Section principal
export const sectionPrevia = dom("section", "", { id: "previa", class: "page" }, true);

// Botão de fechar com SVG
const btnFechaPrev = dom("button", "", { id: "btn-fecha-prev" });
const svgEsquerda = domNs("http://www.w3.org/2000/svg", "svg", "", {
  id: "dupla-esquerda",
  xmlns: "http://www.w3.org/2000/svg",
  fill: "currentColor",
  class: "bi bi-chevron-double-left",
  viewBox: "0 0 16 16"
});

const path1 = domNs("http://www.w3.org/2000/svg", "path", "", {
  "fill-rule": "evenodd",
  d: "M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
});
const path2 = domNs("http://www.w3.org/2000/svg", "path", "", {
  "fill-rule": "evenodd",
  d: "M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
});

adotar(svgEsquerda, [path1, path2]);
adotar(btnFechaPrev, [svgEsquerda]);
adotar(sectionPrevia, [btnFechaPrev]);

// Lista de pagamentos
const ulPagamentos = dom("ul", "", { class: "dPrev" });

// Item Dinheiro com SVG
const liDinheiro = dom("li");
const svgDinheiro = domNs("http://www.w3.org/2000/svg", "svg", "", {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 640 512",
  fill: "green"
});
const pathDinheiro = domNs("http://www.w3.org/2000/svg", "path", "", {
  d: "M64 96C28.7 96 0 124.7 0 160V352c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H64zm0 48h512c8.8 0 16 7.2 16 16V352c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V160c0-8.8 7.2-16 16-16zm256 32a80 80 0 1 0 0 160 80 80 0 1 0 0-160z"
});
adotar(svgDinheiro, [pathDinheiro]);
adotar(liDinheiro, [svgDinheiro]);
liDinheiro.append("Dinheiro");
adotar(ulPagamentos, [liDinheiro]);

// Demais formas de pagamento
export const formas = [
  { src: "./imagens/pix.png", texto: "Pix" },
  { src: "./imagens/elo.png", texto: "Elo" },
  { src: "./imagens/visa.png", texto: "Visa" },
  { src: "./imagens/mastercard.png", texto: "Mastercard" },
  { src: "./imagens/hipercard.png", texto: "Hipercard" }
];

formas.forEach(f => {
  const li = dom("li");
  const img = dom("img", "", { src: f.src });
  adotar(li, [img]);
  li.append(f.texto);
  adotar(ulPagamentos, [li]);
});

adotar(sectionPrevia, [ulPagamentos]);

// Eventos
btnFechaPrev.addEventListener("click", () => {
  sectionPrevia.style.display = "none";
});

// Funções de renderização
export function renderPrevia() {
  root.appendChild(sectionPrevia);
}

export function removePrevia() {
  if (root.contains(sectionPrevia)) {
    root.removeChild(sectionPrevia);
  }
}
