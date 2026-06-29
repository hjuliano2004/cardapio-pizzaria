let x = document.getElementById("btn-fecha-prev");
let btn = document.getElementById("prevPagamentos");
let divPrevia = document.getElementById("previa");

export function previa() {
    // botão de fechar
    x.addEventListener("click", () => {
        divPrevia.style.display = "none";
    });

    // botão que abre
    btn.addEventListener("click", () => {
        divPrevia.style.display = "block";
    });

    // clique fora da div
    window.addEventListener("click", (e) => {
        if (!divPrevia.contains(e.target) && !btn.contains(e.target)) {
            divPrevia.style.display = "none";
        }
    });
}
