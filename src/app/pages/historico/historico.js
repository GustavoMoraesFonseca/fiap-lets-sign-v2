const listaHistorico = document.getElementById("historico");
const botao = document.getElementById("exibir");
const btnRemover = document.getElementById("remover");

const assinaturas = [
    { nome: "João Silva", email: "joao@email.com", status: "Assinado", data: "2023-10-27" },
    { nome: "Maria Souza", email: "maria@email.com", status: "Pendente", data: null },
    { nome: "Pedro Alves", email: "pedro@email.com", status: "Assinado", data: "2023-10-26" },
    { nome: "Ana Oliveira", email: "ana@email.com", status: "Pendente", data: null }
];


function exibirHistorico() {
    listaHistorico.style.display ="block";
    listaHistorico.innerHTML="";

    assinaturas.forEach(assinatura => {
        const itemLista = document.createElement("li");
        itemLista.textContent = `${assinatura.nome} (${assinatura.email}) - Status: ${assinatura.status} ${assinatura.data ? '- Data:' + assinatura.data : ''}`;
        listaHistorico.appendChild(itemLista);
    });
}

function limparHistórico(){
    listaHistorico.innerHTML="";
    listaHistorico.style.display = "none";
}

document.addEventListener('DOMContentLoaded', exibirHistorico);
botao.addEventListener('click', exibirHistorico);
btnRemover.addEventListener('click', limparHistórico);