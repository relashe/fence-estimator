const sgMail = require("@sendgrid/mail");
const { jsPDF } = require("jspdf");
const parser = require("lambda-multipart-parser");

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
    console.log(`Sending PDF report to ${destination}`);

    const { table, totalPerimeter, files } = await parser.parse(event);
    console.log(files);

    const pdfBlob = files[0];

    const pdf = await generateMapPdf(undefined, { table, totalPerimeter });

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
