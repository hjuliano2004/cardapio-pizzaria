export let carrinho = {
    pizzas: [],
    bebidas: [],

    total: ()=>{
        let soma = 0;

        for(let i=0;i<carrinho.pizzas.length;i++){
            soma += carrinho.pizzas[i].getPreco();
        }

        for(let i=0;i<carrinho.bebidas.length;i++){
            soma += carrinho.bebidas[i].getPreco();
        }

        return soma;

    },

    posicaoPizza: (id)=>{
        for(let i=0;i<carrinho.pizzas.length;i++){
            if(carrinho.pizzas[i].getId() === id){
                return i;
            }
        }
    },

    delPizza: (id)=>{

        for(let i=0;i<carrinho.pizzas.length;i++){
            if(carrinho.pizzas[i].getId() === id){
                carrinho.pizzas.splice(i, 1);
                return null;
            }
        }
    },

    delBebida: (id)=>{
        for(let i=0;i<carrinho.bebidas.length;i++){
            if(carrinho.bebidas[i].getId() === id){
                carrinho.bebidas.splice(i, 1);
            }
        }
    }
}

export let sequence = {valor: 0};