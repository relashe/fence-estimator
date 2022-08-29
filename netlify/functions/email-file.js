const sgMail = require("@sendgrid/mail");
const { jsPDF } = require("jspdf");
const fs = require("fs");
import * as Busboy from "busboy";

function parseMultipartForm(event) {
  return new Promise((resolve) => {
    console.log(`parsing`);

    // we'll store all form fields inside of this
    const fields = {};

    // let's instantiate our busboy instance!
    const busboy = Busboy({
      // it uses request headers
      // to extract the form boundary value (the ----WebKitFormBoundary thing)
      headers: event.headers,
    });

    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    busboy.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        filestream.on("data", (data) => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
          };
        });
      }
    );

    // whenever busboy comes across a normal field ...
    busboy.on("field", (fieldName, value) => {
      // ... we write its value into `fields`.
      fields[fieldName] = value;
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    busboy.on("finish", () => {
      resolve(fields);
    });

    // now that all handlers are set up, we can finally start processing our request!
    busboy.write(event.body);
  });
}

const generateMapPdf = async (img, mapElements) => {
  const { table, totalPerimeter } = mapElements;

  let pdf = new jsPDF();
  pdf.setFontSize(12);

  if (img) {
    pdf.addImage(img, "JPEG", 15, 40, 180, 180);
  }

  pdf.addPage();

  pdf.table(10, 10, table, ["name", "length"]);

  pdf.text([`Total: ${totalPerimeter}m`], 10, 10 * (table.length + 1) + 20);

  return Promise.resolve(pdf);
};

exports.handler = async function (event, context) {
  try {
    const { table, totalPerimeter, destination, pdfBlob } =
      await parseMultipartForm(event);
    // const { destination, table, totalPerimeter, aBuffer } = JSON.parse(
    //   event.body
    // );
    console.log(`Sending PDF report to ${destination}`);

    const pdf = await generateMapPdf(undefined, { table, totalPerimeter });
    const report = pdf.output("arraybuffer");

    console.log(`PDF report: ${report}`);

    sgMail.setApiKey(
      "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"
    );

    console.log(`about to send`);

    // const pdfBuffer = Buffer.from(aBuffer);
    const pdfBuffer = Buffer.from(pdfBlob, "binary");

    console.log(`buffer: ${pdfBuffer}`);

    const pdfB64 = pdfBuffer.toString("base64");
    console.log(`buffer result`);
    console.log(pdfB64);

    const msg = {
      to: destination,
      from: "developer@relashe.com",
      subject: "Fence Estimator - Your Fence",
      html: "<strong>Please find your fence data attached</strong>",
      attachments: [
        {
          content: pdfB64,
          filename: "attachment.pdf",
          type: "application/pdf",
          disposition: "attachment",
        },
      ],
    };

    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World" }),
    };
  } catch (error) {
    console.error(error);

    if (error.response) {
      return {
        statusCode: 500,
        body: JSON.stringify(error.response.body),
      };
    }
  }
};
