export let endereco = load();

    function load() {
        let endereco = JSON.parse(localStorage.getItem("endereco"))

        if (!endereco) {
            return {
                bairro: null,
                rua: null,
                numero: null,
                cep: null
            }
        }

        return endereco;
    }