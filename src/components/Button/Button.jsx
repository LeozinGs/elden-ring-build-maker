const Button = ({ children, ...props }) => {
  async function baixarImagem() {
    const elemento = document.querySelector("#root");

    const canvas = await html2canvas(elemento, {
      scale: 2,
      useCORS: true,
      logging: false,
      windowWidth: 1920,
      onclone: (clonedDoc) => {
        // 1. Seleciona o elemento #root clonado
        const elementoFundo = clonedDoc.querySelector("#root");

        // 2. Altera a variável CSS apenas no clone para opacidade total
        if (elementoFundo) {
          elementoFundo.style.setProperty("--general-background", "#04080a");
        }

        // 3. Remove o elemento indesejado
        const elementoParaRemover = clonedDoc.querySelector("#hide_on_print");
        if (elementoParaRemover) {
          elementoParaRemover.remove();
        }
      },
    });

    const link = document.createElement("a");
    link.download = "meu-print-perfeito.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <button id="hide_on_print" onClick={() => baixarImagem()} {...props}>
      {children}
    </button>
  );
};
export default Button;
