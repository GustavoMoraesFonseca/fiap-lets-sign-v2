const listaHistorico = document.getElementById("historico");
const botao = document.getElementById("exibir");
const btnRemover = document.getElementById("remover");


const assinaturas = [];


function exibirHistorico() {
    listaHistorico.style.display ="block";
    listaHistorico.innerHTML="";

    const nomeSalvo =localStorage.getItem('nomeAssinatura');
    const dataSalva = localStorage.getItem('dataAssinatura');
    const fotoSalva = localStorage.getItem('fotoAssinatura');

    if(nomeSalvo && dataSalva){
        assinaturas.push({
            nome: nomeSalvo,
            status: "Assinado",
            data: dataSalva,
            foto: fotoSalva
        });

    localStorage.removeItem('nomeAssinatura');
    localStorage.removeItem('dataAssinatura');
    localStorage.removeItem('fotoAssinatura');
        
    }

    assinaturas.forEach(assinatura => {
        const card = document.createElement("div");
        card.classList.add("card", "mb-4", "text-center", "shadow-sm");
        card.style.width = "18rem";
        card.style.margin = "0 auto"; // centraliza na tela
    
        // Foto
        if (assinatura.foto) {
            const img = document.createElement("img");
            img.src = assinatura.foto;
            img.alt = "Foto do assinante";
            img.classList.add("card-img-top", "rounded-circle", "mx-auto", "mt-3");
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.style.border = "3px solid #dee2e6";
            card.appendChild(img);
        }else{
            const svgContainer = document.createElement("div");
            svgContainer.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="#6c757d" class="bi bi-person-circle mt-3" viewBox="0 0 16 16">
                    <path d="M11 10c1.105 0 2 .672 2 1.5S12.105 13 11 13H5c-1.105 0-2-.672-2-1.5S3.895 10 5 10h6z"/>
                    <path fill-rule="evenodd" d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                </svg>
            `;
            svgContainer.classList.add("mx-auto", "text-center");
            card.appendChild(svgContainer);
        }
    
        // Corpo do card
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
    
        const nome = document.createElement("h5");
        nome.classList.add("card-title", "mb-2");
        nome.textContent = assinatura.nome;
    
        const status = document.createElement("span");
        status.classList.add("badge", "bg-success", "mb-2");
        status.textContent = assinatura.status;
    
        const data = document.createElement("p");
        data.classList.add("card-text", "text-muted", "mb-0");
        data.textContent = `Data: ${assinatura.data}`;
    
        cardBody.appendChild(nome);
        cardBody.appendChild(status);
        cardBody.appendChild(data);
    
        card.appendChild(cardBody);
        listaHistorico.appendChild(card);
    });
}

function limparHistórico(){
    listaHistorico.innerHTML="";
    listaHistorico.style.display = "none";
}

botao.addEventListener('click', exibirHistorico);
btnRemover.addEventListener('click', limparHistórico);

