export let endereco = load();

    function load() {
        let endereco = JSON.parse(localStorage.getItem("endereco"));

        if (!endereco) {
            return {
                bairro: "",
                rua: "",
                numero: "",
                cep: "",
                complemento: ""
            }
        }

        return endereco;
    }

    export function salveEndereco(rua, bairro, cep, numero = 0, complemento){

        if(rua){endereco.rua = rua;}
        if(bairro){endereco.bairro = bairro;}
        if(cep){endereco.cep = cep;}
        if(numero > 0){endereco.numero = numero}
        if(complemento){endereco.complemento = complemento}

        localStorage.setItem("endereco", JSON.stringify(endereco));
    }


    export function limpaEndereco(){
        localStorage.removeItem("endereco")
    }