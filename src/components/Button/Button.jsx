const Button = ({ children, ...props }) => {
  async function convertImagesToBlobUrls(root) {
    const images = Array.from(root.querySelectorAll("img")).filter((img) => {
      const src = img.src;
      return src && !src.startsWith("data:") && !src.startsWith("blob:");
    });

    return Promise.all(
      images.map(async (img) => {
        const originalSrc = img.src;
        const normalizedSrc = originalSrc.replace(
          /(https?:\/\/[^\/]+)\/\/file\//,
          "$1/file/",
        );

        try {
          const response = await fetch(normalizedSrc, {
            method: "GET",
            mode: "cors",
            cache: "force-cache",
          });
          if (!response.ok) throw new Error("Imagem não carregou");

          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          img.dataset.originalSrc = originalSrc;
          img.dataset.blobUrl = blobUrl;
          img.src = blobUrl;
          await new Promise((resolve) => {
            if (img.complete) {
              resolve();
            } else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          });
          return img;
        } catch (error) {
          return null;
        }
      }),
    );
  }

  async function restoreConvertedImages(root) {
    root.querySelectorAll("img").forEach((img) => {
      if (img.dataset.blobUrl) {
        URL.revokeObjectURL(img.dataset.blobUrl);
        img.src = img.dataset.originalSrc || img.src;
        delete img.dataset.blobUrl;
        delete img.dataset.originalSrc;
      }
    });
  }

  async function baixarImagem() {
    const elemento = document.querySelector("#root");
    if (!elemento) return;

    await convertImagesToBlobUrls(elemento);

    const botao = document.querySelector("#hide_on_print");
    if (botao) {
      botao.style.visibility = "hidden";
    }

    let canvas;
    try {
      canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        imageTimeout: 15000,
        logging: false,
        windowWidth: 1920,
        windowHeight: document.documentElement.scrollHeight,
        onclone: (clonedDoc) => {
          const elementoFundo = clonedDoc.querySelector("#root");
          if (elementoFundo) {
            elementoFundo.style.setProperty("--general-background", "#04080a");
          }
        },
      });
    } finally {
      if (botao) {
        botao.style.visibility = "visible";
      }
      await restoreConvertedImages(elemento);
    }

    const link = document.createElement("a");
    link.download = "print-build-perfeita.png";
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
