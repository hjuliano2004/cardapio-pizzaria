import { dom } from "./adotar.js";

const bairros = [
  "Adhemar Garcia", "América", "Anita Garibaldi", "Atiradores", "Aventureiro",
  "Boa Vista", "Bom Retiro", "Bucarein", "Centro", "Comasa", "Costa e Silva",
  "Espinheiros", "Fátima", "Floresta", "Glória", "Iririú", "Itaum", "Itinga",
  "Jardim Paraíso", "Jarivatuba", "João Costa", "Morro do Meio", "Nova Brasília",
  "Paranaguamirim", "Petrópolis", "Pirabeiraba", "Saguaçu", "Santo Antônio",
  "São Marcos", "Vila Nova"
];

export function geraBairros(){
    let lista = [];

    for(let i=0;i<bairros.length;i++){
        lista.push(dom("option", bairros[i], {value: bairros[i]}))
    }

    return lista;
}
