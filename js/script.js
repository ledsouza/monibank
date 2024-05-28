import validarCPF from "./validar-cpf.js";
import validarIdade from "./validar-idade.js";

const camposFormulario = document.querySelectorAll("[required]");
const tiposDeErro = ["valueMissing", "typeMismatch", "patternMismatch", "tooShort", "customError"];
const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido.",
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido.",
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes.",
    },
    cpf: {
        valueMissing: "O campo de CPF não pode estar vazio.",
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes.",
    },
    aniversario: {
        valueMissing: "O campo de data de nascimento não pode estar vazio.",
        customError: "Você deve ser maior que 18 anos para se cadastrar.",
    },
    termos: {
        valueMissing: "Você deve aceitar nossos termos antes de continuar.",
    },
};

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificarCampo(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

function verificarCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity("");
    if (campo.name === "cpf" && campo.value.length >= 11) {
        validarCPF(campo);
    }
    if (campo.name === "aniversario" && campo.value != "") {
        validarIdade(campo);
    }
    tiposDeErro.forEach((erro) => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
        }
    });
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorInput = campo.checkValidity();

    if (!validadorInput) {
        mensagemErro.textContent = mensagem;
    } else {
        mensagemErro.textContent = "";
    }
}
