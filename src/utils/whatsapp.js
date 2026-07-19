export function mensagem(mensagem = null) {

    if (!mensagem) {
        window.alert("mensagem não encontrada")
        return 0
    }

    let numero = "5547997779964"
    let url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    try {
        window.location.href = url;
        return true;
    } catch {
        window.alert("Não foi possível abrir o WhatsApp. Tente novamente.");
        return false;
    }

}