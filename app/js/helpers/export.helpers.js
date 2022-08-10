import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  closeDownloadBtn,
  downloadFormEmail,
  downloadFormName,
} from "../modules/mapElements.module";
import { validateDownloadForm } from "./form.helpers";
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

  pdf.addImage(img, "JPEG", 15, 40, 180, 180);

  pdf.addPage();

  pdf.table(10, 10, table, ["name", "length"]);

  pdf.text([`Total: ${totalPerimeter}m`], 10, 10 * (table.length + 1) + 20);

  return Promise.resolve(pdf);
};

const emailPdfNotification = async (mapElements) => {
  //   const emailMessage = `
  //     <p><strong>A new fence map has been dowloaded by:</strong></p>

  //     <p>${downloadFormName.value} - ${downloadFormEmail.value}</p>

  //     <p> The PDF has been saved on the server.</p>
  //     `;

  //   const message = await Email.send({
  //     SecureToken: "25a36738-9b98-4ff7-9bc4-4b10ceb89033",
  //     To: "paciencia@relashe.com",
  //     From: "developer@relashe.com",
  //     Subject: "Fence (COPY TBC)",
  //     Body: emailMessage,
  //   });

  const { table, totalPerimeter } = generateMapElements(mapElements);

  const emailing = await fetch(
    "https://relashe-fence-estimator.netlify.app/.netlify/functions/ftp-file",
    {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        table,
        totalPerimeter,
        destination: downloadFormEmail.value,
      }), // body data type must match "Content-Type" header
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
  const pdfOutputBlob = pdf.output("blob");
  const pdfOutputBuffer = pdf.output("arraybuffer");
  //   const pdfBase64 = btoa(
  //     String.fromCharCode(...new Uint8Array(pdfOutputBuffer))
  //   );
  let pdfBase642;
  var reader = new FileReader();
  reader.onload = async (event) => {
    pdfBase642 = event.target.result;
    await emailPdfNotification(mapElements);

    // TODO - PDF name
    pdf.save("Fence Estimator - my fence.pdf");

    closeDownloadBtn.click();
    downloadFormName.value = "";
    downloadFormEmail.value = "";
  };

  reader.readAsDataURL(pdfOutputBlob);

  //
  // const pdfDataUri = pdf.output("datauristring");

  // const zip = new JSZip();

  // zip.file("fence.pdf", pdfOutputBuffer);

  // zip
  //   .generateAsync({
  //     type: "base64",
  //     compression: "DEFLATE",
  //     compressionOptions: {
  //       level: 9,
  //     },
  //   })
  //   .then(function (content) {
  //     const pdfDataUri = `data:application/x-zip-compressed;base64,${content}`;

  //   });

  // const ftp = new FtpConnection();
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
