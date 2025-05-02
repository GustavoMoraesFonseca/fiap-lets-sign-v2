const cadastrar = document.getElementById('cadastrar');
const acessar = document.getElementById('acessar');

cadastrar.addEventListener('change', function(){
    if(this.checked){
        window.location.href = '../formulario/formulario.html';
    }
});


acessar.addEventListener('click', function() {

    const emailAcesso = document.getElementById('email');
    const emailDigitado = emailAcesso.value.trim().toLowerCase();
    const senhaDigitada = document.getElementById('senhaAcessar');
    const senhaAcesso = senhaDigitada.value;
    const msgAcesso = document.getElementById('mensagemDeAcesso');
    const userData = JSON.parse(localStorage.getItem('cadastroUsuario'));

    if (!userData) {
        msgAcesso.textContent = "Nenhum usuário cadastrado!";
        msgAcesso.style.color = "yellow";
        return;
    }

    if (senhaAcesso === userData.senha && emailDigitado === userData.email) {
        msgAcesso.textContent = "Acesso autorizado! Redirecionando...";
        msgAcesso.style.color = "green";

        setTimeout(() =>{
            window.location.href = '../visualizacao/selecao.html';
        },5000);
    } else {
        msgAcesso.textContent = "Acesso negado.E-mail ou senha incorretos!";
        msgAcesso.style.color = "red";
    }
});

