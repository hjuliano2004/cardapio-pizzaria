import { sequencia } from "./carrinho.js";



function bebida(name, vol, valor, imagem) {
    let nome = name;
    let preco = 0;
    let src = imagem;
    let volume = vol;
    let id = sequencia();
    let quantidade = 0;

    return {
        getNome: () => nome,
        setNome: (n) => nome = n,

        getPreco: () => preco,
        setPreco: (valor) => preco = valor,

        getSrc: () => src,
        setSrc: (caminho) => src = caminho,

        getVolume: () => volume,
        setVolume: (v) => volume = v,

        getId: () => id,
        setId: (i) => { return id = i },

        getQuantidade: () => { return quantidade },
        soma: () => { return quantidade++ },
        subtracao: () => {
            if (quantidade > 0) {
                quantidade--;
            } return quantidade;
        },

        getAnotacao: () => {
            let obj = {
                nome: nome,
                preco: preco,
                src: src,
                volume: volume,
                id: id
            }

            return obj;
        }
    }
}



export function listaBebidas() {
    return [
        bebida("coca", "350ml", 5, "../../imagens/bebidas/coca-lata.webp"),
        bebida("Guaraná Kuat", "350ml", 3, "../../imagens/bebidas/kuat-lata.webp"),
    ];
}