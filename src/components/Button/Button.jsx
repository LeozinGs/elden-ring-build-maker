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
            if (img.complete) resolve();
            else {
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

    // Captura os valores dos nomes
    const buildNameValue =
      document.querySelector(".buildNameInput")?.value || "BUILD SEM NOME";
    const discordNameValue =
      document.querySelector(".discordNameInput")?.value || "ANÔNIMO";

    await convertImagesToBlobUrls(elemento);

    const botao = document.querySelector("#hide_on_print");
    if (botao) botao.style.visibility = "hidden";

    try {
      // Usa o html2canvas global/existente
      const canvas = await html2canvas(elemento, {
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
            elementoFundo.style.backgroundColor = "#04080a";
            elementoFundo.style.padding = "20px";

            // 1. Esconde os inputs na imagem
            const inputsParaEsconder = clonedDoc.querySelectorAll(
              ".buildNameInput, .discordNameInput",
            );
            inputsParaEsconder.forEach((input) => {
              input.style.display = "none";
            });

            // 2. Cria o cabeçalho (Título e Autor)
            const headerContainer = clonedDoc.createElement("div");
            headerContainer.style.cssText = `
              text-align: center;
              margin-bottom: 25px;
              width: 100%;
              background-color: #04080a;
              border: 4px solid #392e1b;
              border-radius: 5px;
              padding: 25px;
              box-sizing: border-box;
            `;

            const title = clonedDoc.createElement("h1");
            title.innerText = buildNameValue.toUpperCase();
            title.style.cssText =
              "color: #be9752; font-family: serif; font-size: 42px; margin: 0; letter-spacing: 4px;";

            const author = clonedDoc.createElement("p");
            author.innerText = `Autor: "${discordNameValue}"`;
            author.style.cssText =
              "color: aliceblue; font-family: sans-serif; font-size: 18px; margin: 10px 0 0 0; letter-spacing: 2px; opacity: 0.9;";

            headerContainer.appendChild(title);
            headerContainer.appendChild(author);
            elementoFundo.insertBefore(
              headerContainer,
              elementoFundo.firstChild,
            );
          }

          // Ajuste da descrição
          const textArea = clonedDoc.querySelector(".description-input");
          if (textArea) {
            const div = clonedDoc.createElement("div");
            div.innerText = textArea.value;
            div.style.cssText =
              "width: 100%; color: aliceblue; font-family: inherit; font-size: 16px; line-height: 1.5; white-space: pre-wrap; word-wrap: break-word;";
            textArea.parentNode.replaceChild(div, textArea);
          }
        },
      });

      // Download
      const link = document.createElement("a");
      link.download = `${buildNameValue.replace(/\s+/g, "-").toLowerCase()}-build.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Erro:", error);
    } finally {
      if (botao) botao.style.visibility = "visible";
      await restoreConvertedImages(elemento);
    }
  }

  return (
    <button id="hide_on_print" onClick={baixarImagem} {...props}>
      {children}
    </button>
  );
};

export default Button;
