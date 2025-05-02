const inputFile = document.getElementById("fileInput");
const pdfViewer = document.getElementById("pdfViewer");

inputFile.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert("Por favor, selecione um arquivo PDF.");
        return;
    }

    const arrayBuffer = await file.arrayBuffer();

    // Armazena em localStorage em base64 para transferir
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    localStorage.setItem('pdfBase64', base64);

    const blob = new Blob([arrayBuffer], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    pdfViewer.src = url;
});

