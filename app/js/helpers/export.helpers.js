import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  closeDownloadBtn,
  downloadFormEmail,
  downloadFormName,
} from "../modules/mapElements.module";
import { google } from "../modules/starter.module";

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

const generateMapPdf = (img, mapElements) => {
  const { table, totalPerimeter } = generateMapElements(mapElements);
  let pdf = new jsPDF();
  pdf.setFontSize(12);

  // pdf.addImage(img, "JPEG", 15, 40, 180, 180);

  pdf.addPage();

  pdf.table(10, 10, table, ["name", "length"]);

  pdf.text([`Total: ${totalPerimeter}m`], 10, 10 * (table.length + 1) + 20);

  return Promise.resolve(pdf);
};

const ftpPdfNotification = async (mapElements, mapImage, pdfOutpoutBlob) => {
  const { table, totalPerimeter } = generateMapElements(mapElements);

  const data = new FormData();

  data.append("table", JSON.stringify(table));
  data.append("totalPerimiter", totalPerimeter);
  data.append("pdfBlob", pdfOutpoutBlob);
  // data.append("mapImage", mapImage);

  const ftping = await fetch(
    "https://relashe-fence-estimator.netlify.app/.netlify/functions/ftp-file",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      // body data type must match "Content-Type" header
      body: data,
    }
  );

  return Promise.resolve(ftping);
};

const emailPdfNotification = async (mapElements, mapImage, pdfOutpoutBlob) => {
  const { table, totalPerimeter } = generateMapElements(mapElements);

  const data = new FormData();

  data.append("destination", downloadFormEmail.value);
  data.append("table", JSON.stringify(table));
  data.append("totalPerimiter", totalPerimeter);
  data.append("pdfBlob", pdfOutpoutBlob);

  const emailing = await fetch(
    "https://relashe-fence-estimator.netlify.app/.netlify/functions/email-file",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        // "Content-Type": "multipart/form-data; boundary=----WebKitFormBoundary",
      },
      // body data type must match "Content-Type" header
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

  const pdfOutputABuffer = pdf.output("arraybuffer");
  console.log(pdfOutputABuffer);

  const pdfOutpoutBlob = pdf.output("blob");
  console.log(pdfOutpoutBlob);

  await emailPdfNotification(mapElements, mapImage, pdfOutpoutBlob);

  await ftpPdfNotification(mapElements, mapImage, pdfOutpoutBlob);

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
    downloadMap(mapImage, mapElements);
  }

  if (mapCanvasAction === "print") {
    printMap(mapImage, width, height);
  }
  mapCanvasAction = undefined;
};
