
export function Bebida(name, vol, valor = 0, imagem) {
    let nome = name;
    let preco = valor;
    let src = imagem;
    let volume = vol;

    return {
        getNome: () => nome,
        setNome: (n) => nome = n,

        getPreco: () => { return preco },
        setPreco: (valor) => preco = valor,

        getSrc: () => src,
        setSrc: (caminho) => src = caminho,

        getVolume: () => volume,
        setVolume: (v) => volume = v,

        getId: () => id,
        setId: (i) => { return id = i },

        getAnotacao: () => {
            let obj = {
                nome: nome,
                preco: preco,
                src: src,
                volume: volume,
            }

            return obj;
        }
    }
}

export const listaBebidas = [
    item("coca lata",    "350ml", 5, "./imagens/bebidas/file.png"),
    item("kuat lata",    "350ml", 3, "./imagens/bebidas/kuat-lata.webp"),
    item("guaraná lata", "350ml", 4, "./imagens/bebidas/foto.png"),
    item("água mineral", "500ml", 2, "./imagens/bebidas/foto.png"),
    item("suco laranja", "300ml", 6, "./imagens/bebidas/foto.png"),
    item("cerveja lata", "350ml", 7, "./imagens/bebidas/foto.png"),
    item("chá gelado"  , "500ml", 5, "./imagens/bebidas/foto.png"),

    // Garrafas
    item("coca garrafa", "2L", 12, "./imagens/bebidas/foto.png"),
    item("guaraná garrafa", "2L", 11, "./imagens/bebidas/foto.png"),
    item("água mineral garrafa", "1,5L", 4, "./imagens/bebidas/foto.png"),
    item("suco uva garrafa", "1L", 9, "./imagens/bebidas/foto.png"),
    item("cerveja garrafa", "600ml", 10, "./imagens/bebidas/foto.png")
];

function item(nome, vol, valor, imagem) {//objeto que garante padronização dos modelos de refrigerante
    return {
        nome: nome,
        vol: vol,
        valor: valor,
        imagem: imagem
    }
}
