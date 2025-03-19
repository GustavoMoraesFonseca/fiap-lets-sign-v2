const inputFile = document.getElementById("fileInput");
const pdfViewer = document.getElementById("pdfViewer");
let loadedPdfBytes;

inputFile.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("Por favor, selecione um arquivo PDF.");
        return;
    }

    const arrayBuffer = await file.arrayBuffer();
    loadedPdfBytes = arrayBuffer;

    const url = URL.createObjectURL(new Blob([arrayBuffer], { type: "application/pdf" }));
    pdfViewer.src = url;
});

document.getElementById("assinar").addEventListener("click", async () => {
    if (!loadedPdfBytes) {
        alert("Por favor, carregue um arquivo PDF antes de adicionar a assinatura.");
        return;
    }

    const pdfDoc = await PDFLib.PDFDocument.load(loadedPdfBytes);

    const firstPage = pdfDoc.getPages()[0];

    const nome = "Seu Nome Aqui";
    const dataAssinatura = new Date().toLocaleString();

    firstPage.drawText(`Assinado por: ${nome}`, {
        x: 50,
        y: 100,
        size: 12,
        color: PDFLib.rgb(0, 0, 0)
    });

    firstPage.drawText(`Data e Hora: ${dataAssinatura}`, {
        x: 50,
        y: 80,
        size: 12,
        color: PDFLib.rgb(0, 0, 0)
    });


    const pdfBytes = await pdfDoc.save();

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const signedPdfUrl = URL.createObjectURL(blob);
    pdfViewer.src = signedPdfUrl;

    const link = document.createElement("a");
    link.href = signedPdfUrl;
    link.download = "documento_assinado.pdf";
    link.click();
});