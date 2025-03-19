const listaHistorico = document.getElementById('historico');
const btnExibir = document.getElementById('exibir');
const btnLimpar = document.getElementById('limpar');

function gerarPalavrasAleatorias(quantidade) {
    const palavras = [
      "gato", "cachorro", "casa", "árvore", "sol", "lua", "rio", "montanha",
      "livro", "computador", "telefone", "carro", "bicicleta", "fogo", "água",
      "terra", "ar", "tempo", "pessoa", "mundo", "cidade", "país", "flor", "fruta",
      "comida", "bebida", "roupa", "sapato", "chapéu", "óculos", "música", "dança",
      "jogo", "filme", "teatro", "arte", "ciência", "história", "matemática",
      "física", "química", "biologia", "geografia", "economia", "política",
      "sociedade", "cultura", "esporte", "lazer", "trabalho", "estudo", "família",
      "amigo", "amor", "ódio", "paz", "guerra", "bem", "mal", "vida", "morte"
    ];
  
    const palavrasEmbaralhadas = [...new Set(palavras)].sort(() => Math.random() - 0.5);
    return palavrasEmbaralhadas.slice(0, quantidade);
  }
    

const palavrasGeradas = gerarPalavrasAleatorias(12);

function exibirPalavras(){
    listaHistorico.style.display ="block";
    listaHistorico.innerHTML="";
    palavrasGeradas.forEach(palavra =>{
        const itemLista = document.createElement('li');
        itemLista.textContent = `${palavra}`
        listaHistorico.appendChild(itemLista);
    })
        
}

function limparHistórico(){
    listaHistorico.innerHTML="";
    listaHistorico.style.display = "none";
    const novasPalavras = gerarPalavrasAleatorias(12);
    palavrasGeradas.splice(0, palavrasGeradas.length, ...novasPalavras);
}

btnExibir.addEventListener('click', exibirPalavras);
btnLimpar.addEventListener('click', limparHistórico);

