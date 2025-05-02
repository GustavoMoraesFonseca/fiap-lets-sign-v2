const somBiometria = new Audio("https://www.myinstants.com/media/sounds/beep.mp3");

function abrirScanner() {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("scanner").addEventListener("touchstart", autenticar);
    document.getElementById("scanner").addEventListener("click", autenticar);
}

function autenticar() {
    let scanner = document.getElementById("scanner");
    let mensagem = document.getElementById("mensagem");
    let contador = 0;

    mensagem.innerText = "Lendo digital...";

    let piscar = setInterval(() => {
        scanner.style.border = "4px solid red"; // Vermelho
        setTimeout(() => scanner.style.border = "4px solid transparent", 200);
        contador++;

        if (contador === 3) {
            clearInterval(piscar);
            scanner.style.border = "4px solid green"; 

            setTimeout(() => {
                somBiometria.play(); 
                mensagem.innerText = "Autenticação bem-sucedida!";
                document.getElementById("status").innerText = "Autenticação bem-sucedida!";
                
        
                const metodoAtual = 'biometria';
                let validados = JSON.parse(localStorage.getItem('metodosValidados') || '[]');

                if (!validados.includes(metodoAtual)) {
                    validados.push(metodoAtual);
                    localStorage.setItem('metodosValidados', JSON.stringify(validados));
                }

                
                setTimeout(() => {
                    document.getElementById("modal").style.display = "none";
                    window.close(); 
                }, 1000);
            }, 500);
        }
    }, 400);
}
