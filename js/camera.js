const botaoIniciarCamera = document.querySelector("[data-video-botao]");
const campoCamera = document.querySelector("[data-camera]");
const video = document.querySelector("[data-video]");
const botaoTirarFoto = document.querySelector("[data-tirar-foto]");
const canvas = document.querySelector("[data-video-canvas]");
const mensagem = document.querySelector("[data-mensagem]");
const botaoEnviarFoto = document.querySelector("[data-enviar]");
let imagemURL = "";

botaoIniciarCamera.addEventListener("click", iniciarVideo);
botaoTirarFoto.addEventListener("click", tirarFoto);
botaoEnviarFoto.addEventListener("click", enviarFoto);

async function iniciarVideo() {
    const videoStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });

    botaoIniciarCamera.style.display = "none";
    campoCamera.style.display = "block";

    video.srcObject = videoStream;
}

function tirarFoto() {
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
    imagemURL = canvas.toDataURL("image/jpeg");

    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });
    video.srcObject = null;

    campoCamera.style.display = "none";
    mensagem.style.display = "block";
}

function enviarFoto() {
    const dadosExistentes = localStorage.getItem("cadastro");
    const dadosExistentesParsed = JSON.parse(dadosExistentes);

    dadosExistentesParsed.imagem = imagemURL;

    localStorage.setItem("cadastro", JSON.stringify(dadosExistentesParsed));

    window.location.href = "../pages/abrir-conta-form-3.html";
}
