import { root } from "../../script.js";

// Criar a section
export const sectionPrevia = document.createElement("section");
sectionPrevia.id = "previa";
sectionPrevia.className = "page";

// Botão de fechar
const btnFechaPrev = document.createElement("button");
btnFechaPrev.id = "btn-fecha-prev";

// SVG dentro do botão
const svgEsquerda = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgEsquerda.id = "dupla-esquerda";
svgEsquerda.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svgEsquerda.setAttribute("fill", "currentColor");
svgEsquerda.setAttribute("class", "bi bi-chevron-double-left");
svgEsquerda.setAttribute("viewBox", "0 0 16 16");

// Paths do SVG
const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path1.setAttribute("fill-rule", "evenodd");
path1.setAttribute("d", "M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0");

const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
path2.setAttribute("fill-rule", "evenodd");
path2.setAttribute("d", "M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0");

svgEsquerda.appendChild(path1);
svgEsquerda.appendChild(path2);
btnFechaPrev.appendChild(svgEsquerda);
sectionPrevia.appendChild(btnFechaPrev);

// Lista de pagamentos
const ulPagamentos = document.createElement("ul");
ulPagamentos.className = "dPrev";

// Item Dinheiro com SVG
const liDinheiro = document.createElement("li");
const svgDinheiro = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgDinheiro.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svgDinheiro.setAttribute("viewBox", "0 0 640 512");
svgDinheiro.setAttribute("fill", "green");

const pathDinheiro = document.createElementNS("http://www.w3.org/2000/svg", "path");
pathDinheiro.setAttribute("d", "M64 96C28.7 96 0 124.7 0 160V352c0 35.3 28.7 64 64 64H576c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H64zm0 48h512c8.8 0 16 7.2 16 16V352c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V160c0-8.8 7.2-16 16-16zm256 32a80 80 0 1 0 0 160 80 80 0 1 0 0-160z");
svgDinheiro.appendChild(pathDinheiro);

liDinheiro.appendChild(svgDinheiro);
liDinheiro.append("Dinheiro");
ulPagamentos.appendChild(liDinheiro);

// Demais itens com imagens
const formas = [
  { src: "./imagens/pix.png", texto: "Pix" },
  { src: "./imagens/elo.png", texto: "Elo" },
  { src: "./imagens/visa.png", texto: "Visa" },
  { src: "./imagens/mastercard.png", texto: "Mastercard" },
  { src: "./imagens/hipercard.png", texto: "Hipercard" }
];

formas.forEach(f => {
  const li = document.createElement("li");
  const img = document.createElement("img");
  img.src = f.src;
  li.appendChild(img);
  li.append(f.texto);
  ulPagamentos.appendChild(li);
});

sectionPrevia.appendChild(ulPagamentos);

btnFechaPrev.addEventListener("click", () => {
    sectionPrevia.style.display = "none";
})

export function renderPrevia() {
  root.appendChild(sectionPrevia);
}

export function removePrevia() {
  if (root.contains(sectionPrevia)) {
    root.removeChild(sectionPrevia);
  }
}