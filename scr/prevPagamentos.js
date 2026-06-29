let x = document.getElementById("btn-fecha-prev");
let btn = document.getElementById("prevPagamentos");

let divPrevia = document.getElementById("previa");



export function previa() {
    x.addEventListener("click", () => {
        divPrevia.style.display = "none";
    })

    btn.addEventListener("click", () => {
        divPrevia.style.display = "block";
    })

}