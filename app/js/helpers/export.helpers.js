import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  closeDownloadBtn,
  downloadFormEmail,
  downloadFormName,
} from "../modules/mapElements.module";
import { google } from "../modules/starter.module";
import imageCompression from "browser-image-compression";

const generateMapElements = (mapElements) => {
  let totalPerimeter = 0;
  let table = [];

  mapElements.forEach((shape, index) => {
    const shapeLength = google.maps.geometry.spherical.computeLength(
      shape.getPath().getArray()
    );

    table.push({
      name: `${shape.paddockName}`,
      length: `${shapeLength.toFixed(0)}`,
    });

    totalPerimeter += shapeLength.toFixed(0);
  });

  return {
    table,
    totalPerimeter,
  };
};

const generateMapPdf = async (img, mapElements) => {
  const { table, totalPerimeter } = generateMapElements(mapElements);
  const compressedImageDataUrl = await imageCompression.getDataUrlFromFile(img);

  let pdf = new jsPDF();
  pdf.setFontSize(12);

  pdf.addImage(compressedImageDataUrl, "JPEG", 15, 40, 150, 150);

  pdf.addPage();

  pdf.table(10, 10, table, ["name", "length"]);

  pdf.text([`Total: ${totalPerimeter}m`], 10, 10 * (table.length + 1) + 20);

  return Promise.resolve(pdf);
};

const ftpPdfNotification = async (pdfOutpoutBlob) => {
  const data = new FormData();

  data.append("pdfBlob", pdfOutpoutBlob);

  const ftping = await fetch(
    "https://relashe-fence-estimator.netlify.app/.netlify/functions/ftp-file",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "*/*",
      },
      body: data,
    }
  );

  return Promise.resolve(ftping);
};

const emailPdfNotification = async (pdfOutpoutBlob) => {
  const data = new FormData();

  data.append("destination", downloadFormEmail.value);
  data.append("pdfBlob", pdfOutpoutBlob);

  const emailing = await fetch(
    "https://relashe-fence-estimator.netlify.app/.netlify/functions/email-file",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "*/*",
      },
      body: data,
    }
  );

  return Promise.resolve(emailing);
};

const printMap = (mapImage, width, height) => {
  document.querySelectorAll(".print")[0].innerHTML = `
          <img src="${mapImage}" style="width: ${width}px; height: ${height}px;" />
          `;

  setTimeout(() => {
    window.print();
  }, 0);
};

const downloadMap = async (mapImage, mapElements) => {
  // generate PDF
  // email customer details
  // ftp to client

  const pdf = await generateMapPdf(mapImage, mapElements);

  const pdfOutpoutBlob = pdf.output("blob");
  console.log(pdfOutpoutBlob);

  await emailPdfNotification(pdfOutpoutBlob);

  await ftpPdfNotification(pdfOutpoutBlob);

  // TODO - PDF name
  pdf.save("Fence Estimator - my fence.pdf");

  // close and clear
  closeDownloadBtn.click();
  downloadFormName.value = "";
  downloadFormEmail.value = "";
};

export const exportMap = async (mapContainer, mapCanvasAction, mapElements) => {
  const width = mapContainer.clientWidth;
  const height = mapContainer.clientHeight;

  const mapCanvas = await html2canvas(mapContainer, {
    useCORS: true,
    imageTimeout: 0,
    width,
    height,
  });

  const mapImage = mapCanvas.toDataURL("image/jpeg,1.0");

  if (mapCanvasAction === "download") {
    const imageFile = await imageCompression.getFilefromDataUrl(
      mapImage,
      "fence-map"
    );

    const compressedMapImage = await imageCompression(imageFile, {});
    downloadMap(compressedMapImage, mapElements);
  }

  if (mapCanvasAction === "print") {
    printMap(mapImage, width, height);
  }
  mapCanvasAction = undefined;
};
