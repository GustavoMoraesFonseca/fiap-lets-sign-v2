document.addEventListener('DOMContentLoaded', function () {
    const autenticarBtn = document.querySelector('#btn_autenticar');
    const conteudoValidacao = document.getElementById('conteudo_validacao');

    autenticarBtn.addEventListener('click', function () {
        const metodosSelecionados = [];
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                metodosSelecionados.push(checkbox.value);
            }
        });

        if (metodosSelecionados.length < 2) {
            conteudoValidacao.innerHTML = '<p style="color: red;">Selecione pelo menos 2 métodos de autenticação.</p>';
            return;
        }

        localStorage.setItem('metodosPendentes', JSON.stringify(metodosSelecionados));
        localStorage.setItem('metodosValidados', JSON.stringify([]));

        const abasAutenticacao = [];


        metodosSelecionados.forEach(metodo => {
            let caminhoArquivo = '';

            switch (metodo) {
                case 'biometria_facial':
                    caminhoArquivo = '../reconhecimentofacial/facial.html';
                    break;
                case 'biometria':
                    caminhoArquivo = '../biometria/biometria.html';
                    break;
                case 'mfa':
                    caminhoArquivo = '../qrcode/qrcode.html';
                    break;
                case 'palavras':
                    caminhoArquivo = '../palavras-aleatorias/palavras-aleatorias.html';
                    break;
                default:
                    console.log(`Método desconhecido: ${metodo}`);
            }

            if (caminhoArquivo) {
                const novaAba = window.open(caminhoArquivo, '_blank');
                abasAutenticacao.push(novaAba);
            }
        });

        
        const intervalo = setInterval(() => {
            const pendentes = JSON.parse(localStorage.getItem('metodosPendentes') || '[]');
            const validados = JSON.parse(localStorage.getItem('metodosValidados') || '[]');
    
            const todosValidados = pendentes.every(metodo => validados.includes(metodo));
    
            if (todosValidados) {
                clearInterval(intervalo);

                abasAutenticacao.forEach(aba => {
                    if (aba && !aba.closed) {
                        aba.close();
                    }
                });

                window.location.href = '../visualizacao/assinatura.html';
            }
        }, 5000);
    });
});
