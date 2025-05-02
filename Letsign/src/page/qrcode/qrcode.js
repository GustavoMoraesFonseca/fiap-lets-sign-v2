
function gerarSenha () {
    const caracteres ='ABCDEFGHIJKLMNOPQRSUVWXYZabcdefghijklmnopqrsuvwxyz1234567890!@#$%&amp;*';
    let novaSenha = '';
    for (let i = 0; i < 6; i++) {
        const indice = Math.round(Math.random() * caracteres.length);
        novaSenha += caracteres[indice];
    }
    return novaSenha;
}

let codigo = gerarSenha();
let intervaloTempo;
let tempoRestante = 60;

function gerarQRCode(){
    const inputUsuario = codigo;
    const googleChartAPI =' https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=';
    const conteudoQRCode = googleChartAPI + inputUsuario;

    document.getElementById("qrContent").style.display = '';

    document.querySelector('#qrcodeimg').src = conteudoQRCode;

    tempoRestante = 60;
    document.getElementById("timer").textContent = tempoRestante;

    clearInterval(intervaloTempo);

    intervaloTempo = setInterval(() => {
        tempoRestante--;
        document.getElementById("timer").textContent = tempoRestante;

        if(tempoRestante <= 0){
            clearInterval(intervaloTempo);
            document.querySelector('#qrcodeimg').innerHTML = "";
            alert("O QR code expirou. Gere um novo!");
            location.reload();
        }
    }, 1000);
};

function validarCodigo() {
    const codigoDigitado = document.getElementById("codigoValidacao").value;

    if (codigoDigitado === codigo) {
        alert("Código válido! Acesso autorizado.");
        const metodoAtual = 'mfa';
        let validados = JSON.parse(localStorage.getItem('metodosValidados') || '[]');
        if (!validados.includes(metodoAtual)) {
            validados.push(metodoAtual);
            localStorage.setItem('metodosValidados', JSON.stringify(validados));
        }
        window.close();
    } else {
        alert("Código inválido. Tente novamente.");
    }
}
