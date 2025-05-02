
document.addEventListener('DOMContentLoaded', function () {

    const alterarSenhaBotao = document.getElementById('alterarSenha');
    const mensagemAlteracao = document.getElementById('msg');


    alterarSenhaBotao.addEventListener('click', function () {

        const novaSenha = document.getElementById('novaSenha').value.trim();
        const confirmarNovaSenha = document.getElementById('confirmarNovaSenha').value.trim();

        if (novaSenha === "" || confirmarNovaSenha === "") {
            mensagemAlteracao.textContent = "Preencha os dois campos!";
            mensagemAlteracao.style.color = 'red';
            return;
        }

        if (novaSenha !== confirmarNovaSenha) {
            mensagemAlteracao.textContent = "As senhas não coincidem!";
            mensagemAlteracao.style.color = 'red';
            return;
        }

        const userData = JSON.parse(localStorage.getItem('cadastroUsuario'));

        if (userData) {
            userData.senha = novaSenha;
            localStorage.setItem('cadastroUsuario', JSON.stringify(userData));
            mensagemAlteracao.textContent = "Senha alterada com sucesso!";
            mensagemAlteracao.style.color = 'green';
            setTimeout(()=>{
                window.location.href = './login.html';
            }, 5000);
        } else {
            mensagemAlteracao.textContent = "Nenhum usuário encontrado!";
            mensagemAlteracao.style.color = 'red';
        }
    });

});

