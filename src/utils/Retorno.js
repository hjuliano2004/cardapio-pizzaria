import { router } from "../../script.js";
import { navigate } from "./Router.js";

export function btn_retorno(url) {

    let btn = document.createElement("button");

    const svgRetorno = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgRetorno.classList.add("retorno", "bi", "bi-chevron-double-left");
    svgRetorno.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgRetorno.setAttribute("fill", "currentColor");
    svgRetorno.setAttribute("viewBox", "0 0 16 16");

    // Paths do SVG
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("fill-rule", "evenodd");
    path1.setAttribute("d", "M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("fill-rule", "evenodd");
    path2.setAttribute("d", "M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0");

    svgRetorno.appendChild(path1);
    svgRetorno.appendChild(path2);

    btn.appendChild(svgRetorno);
    btn.classList.add("btn_retorno");

    btn.addEventListener("click", ()=>{
        navigate(router, url);
    });

    return btn;

}

