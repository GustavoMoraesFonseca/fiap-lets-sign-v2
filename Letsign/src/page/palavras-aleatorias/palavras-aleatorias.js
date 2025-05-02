
const lista = [
  "gato", "cachorro", "casa", "árvore", "sol", "lua", "rio", "montanha",
  "livro", "computador", "telefone", "carro", "bicicleta", "fogo", "água",
  "terra", "ar", "tempo", "pessoa", "mundo", "cidade", "país", "flor", "fruta",
  "comida", "bebida", "roupa", "sapato", "chapéu", "óculos", "música", "dança",
  "jogo", "filme", "teatro", "arte", "ciência", "história", "matemática",
  "física", "química", "biologia", "geografia", "economia", "política",
  "sociedade", "cultura", "esporte", "lazer", "trabalho", "estudo", "família",
  "amigo", "amor", "ódio", "paz", "guerra", "bem", "mal", "vida", "morte"
];

let palavrasGeradas = []; // Palavras geradas
let palavrasInseridas = []; // Palavras inseridas pelo usuário
let etapaAtual = 0; // Etapa atual da validação

const botaoGerarPalavras = document.getElementById("gerar");
const inputContainer = document.getElementById("inputContainer");
const palavraInserida = document.getElementById("palavraInserida");
const instrucao = document.getElementById("instrucao");
const feedback = document.getElementById("feedback");
const botaoValidacao = document.getElementById("validacao");
const resultado = document.getElementById("resultado");



function gerarPalavras() {
  const palavrasSelecionadas = [];
  while (palavrasSelecionadas.length < 12) {
      const randomWord = lista[Math.floor(Math.random() * lista.length)];
      if (!palavrasSelecionadas.includes(randomWord)) {
          palavrasSelecionadas.push(randomWord);
      }
  }

  const palavrasDiv = document.getElementById('palavrasDiv');
  palavrasDiv.innerHTML = "";
  palavrasDiv.textContent = palavrasSelecionadas.join(', ');

  return palavrasSelecionadas;
}


botaoGerarPalavras.addEventListener("click", () => {
  botaoGerarPalavras.style.display = "none";
  palavrasDiv.style.display = "block";
  palavrasGeradas = gerarPalavras();
  localStorage.setItem("palavrasGeradas", JSON.stringify(palavrasGeradas));
  alert("As palavras foram geradas e siga as instruções!");

  setTimeout(()=>{
    palavrasDiv.style.display = "none";
    inputContainer.style.display = "block"; 
    instrucao.textContent = `Insira a palavra 1:`; 
    feedback.textContent = ""; 
    palavrasInseridas = []; 
    etapaAtual = 0; 
    resultado.textContent = ""; 
    botaoValidacao.style.display = "none";
},5000);

});



palavraInserida.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
      const inseridaPalavra = palavraInserida.value.trim(); 
      if (!inseridaPalavra) {
          feedback.textContent = "Por favor, insira uma palavra válida!";
          feedback.style.color = "red";
          return;
      }

      if (inseridaPalavra === palavrasGeradas[etapaAtual]) {
          feedback.textContent = "Palavra correta!";
          feedback.style.color = "green";
          palavrasInseridas.push(inseridaPalavra); 
          etapaAtual++; 

          if (etapaAtual < 12) {
              instrucao.textContent = `Insira a palavra ${etapaAtual + 1}:`;
              palavraInserida.value = ""; 
          } else {
              inputContainer.style.display = "none"; 
              botaoValidacao.style.display = "block"; 
          }
      } else {
          feedback.textContent = "Palavra incorreta. Tente novamente.";
          feedback.style.color = "red";
      }
  }
});


botaoValidacao.addEventListener("click", () => {
  const palavraSalva = JSON.parse(localStorage.getItem("palavrasGeradas"));
  if (JSON.stringify(palavrasInseridas) === JSON.stringify(palavraSalva)) {
      resultado.textContent = "Validação com sucesso! Sequência correta.";
      resultado.style.color = "green";
      setTimeout(() => location.reload(), 3000); 

    const metodoAtual = 'palavras';
    let validados = JSON.parse(localStorage.getItem('metodosValidados') || '[]');
    
    if (!validados.includes(metodoAtual)) {
        validados.push(metodoAtual);
        localStorage.setItem('metodosValidados', JSON.stringify(validados));
    }

    window.close();

  } else {
      resultado.textContent = "Sequência incorreta. Tente novamente.";
      resultado.style.color = "red";
      setTimeout(() => location.reload(), 3000); 
  }
});

