export default function validarIdade(campo) {
    const dataNascimento = new Date(campo.value);
    if (!ehMais18(dataNascimento)) {
        campo.setCustomValidity("O usuário não é maior de 18 anos");
    }
}

function ehMais18(dataNascimento) {
    const dataAtual = new Date();
    const dataMais18 = new Date(
        dataNascimento.getUTCFullYear() + 18,
        dataNascimento.getUTCMonth(),
        dataNascimento.getUTCDate()
    );
    return dataAtual >= dataMais18;
}
