const pdfViewer = document.getElementById("pdfViewer");

async function carregarPDF() {
    const base64 = localStorage.getItem('pdfBase64');
    if (!base64) {
        alert("Nenhum documento carregado.");
        return;
    }

    const byteArray = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    pdfViewer.src = url;
}

carregarPDF();

document.getElementById("assinar").addEventListener("click", async () => {
    const base64 = localStorage.getItem('pdfBase64');
    if (!base64) {
        alert("Documento não encontrado.");
        return;
    }

    const byteArray = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const pdfDoc = await PDFLib.PDFDocument.load(byteArray);
    const firstPage = pdfDoc.getPages()[0];

    const userData = JSON.parse(localStorage.getItem('cadastroUsuario')) || {};
    const nome = userData.nome || "Nome não informado";
    const dataAssinatura = new Date().toLocaleString();

    firstPage.drawText(`Assinado por: ${nome}`, {
        x: 50,
        y: 20,
        size: 12,
        color: PDFLib.rgb(0, 0, 0)
    });

    firstPage.drawText(`Data e Hora: ${dataAssinatura}`, {
        x: 50,
        y: 5,
        size: 12,
        color: PDFLib.rgb(0, 0, 0)
    });

    const pdfBytes = await pdfDoc.save();
    const signedBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const signedUrl = URL.createObjectURL(signedBlob);

    // Atualiza visualização
    pdfViewer.src = signedUrl;

    // Baixa
    const link = document.createElement("a");
    link.href = signedUrl;
    link.download = "documento_assinado.pdf";
    link.click();

    localStorage.setItem('nomeAssinatura', nome);
    localStorage.setItem('dataAssinatura', dataAssinatura);
    window.dispatchEvent(new Event('novaAssinaturaLocal'));
});