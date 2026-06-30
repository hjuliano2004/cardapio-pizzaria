import Router from "./Router.js";

export function rotas() {


    // Define quais elementos ficam visíveis em cada rota
    const routes = {
        "/": () => showElements(["inicio"]),
        "/sabores": () => showElements(["sabores"]),
        "/previa": () => showElements(["inicio", "previa"]),
        "/bebidas": () => showElements(["bebidas"]),

        "/404": () => showElements(["notfound"])
    };

    const router = new Router(routes);

    // Função que controla visibilidade de múltiplos elementos
    function showElements(ids) {
        document.querySelectorAll(".page").forEach(el => {
            el.style.display = "none";
        });
        ids.forEach(id => {
            document.getElementById(id).style.display = "block";
        });
    }

    // Intercepta links
    document.querySelectorAll("a[data-link]").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            router.navigate(link.getAttribute("href"));
        });
    });


}