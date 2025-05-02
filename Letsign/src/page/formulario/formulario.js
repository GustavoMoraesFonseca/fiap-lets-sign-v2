document.addEventListener('DOMContentLoaded', () => {
    const nomeInput = document.getElementById('nome');
    const cpfInput = document.getElementById('cpf');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmarSenha');
    const termosCheckbox = document.getElementById('aceitarTermos');
    const formulario = document.getElementById('contato');
    const enviarButton = document.querySelector('.btn-primary');
    const mensagemDiv = document.getElementById('mensagem');

    function mostrarMensagem(texto, tipo = 'erro') {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = `mensagem ${tipo}`;
    }

    function validarNome(nome) {
        return /^[A-Za-zÀ-ÿ\s]+$/.test(nome.trim());
    }

    function validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    }

    function validarTelefone(telefone) {
        return /^\d{10,11}$/.test(telefone.trim());
    }

    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        return cpf.length === 11;
    }
    

    function validarCadastro(event) {
        event.preventDefault(); // Impede envio padrão

        // Limpar mensagens
        mostrarMensagem('');

        const nome = nomeInput.value;
        const cpf = cpfInput.value;
        const email = emailInput.value;
        const telefone = telefoneInput.value;
        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;

        if (!validarNome(nome)) {
            mostrarMensagem('Por favor, digite um nome válido (apenas letras e espaços).');
            nomeInput.focus();
            return;
        }

        if (!validarCPF(cpf)) {
            mostrarMensagem('Por favor, digite um CPF válido.');
            cpfInput.focus();
            return;
        }

        if (!validarEmail(email)) {
            mostrarMensagem('Por favor, digite um email válido.');
            emailInput.focus();
            return;
        }

        if (!validarTelefone(telefone)) {
            mostrarMensagem('Digite um telefone válido com DDD (10 ou 11 dígitos).');
            telefoneInput.focus();
            return;
        }

        if (senha.length < 6) {
            mostrarMensagem('A senha deve ter pelo menos 6 caracteres.');
            senhaInput.focus();
            return;
        }

        if (senha !== confirmarSenha) {
            mostrarMensagem('As senhas não coincidem.');
            confirmarSenhaInput.focus();
            return;
        }

        if (!termosCheckbox.checked) {
            mostrarMensagem('Você precisa aceitar os Termos e Condições.');
            return;
        }

        
        const userData = {
            nome: nome.trim(),
            cpf: cpf.replace(/[^\d]/g, ''),
            email: email.trim().toLowerCase(),
            telefone: telefone.trim(),
            senha: senha 
        };

        localStorage.setItem('cadastroUsuario', JSON.stringify(userData));
        mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');
        formulario.reset();
        window.location.href = '../login/login.html';
    }

    enviarButton.addEventListener('click', validarCadastro);

    formulario.addEventListener('submit', validarCadastro);
});
