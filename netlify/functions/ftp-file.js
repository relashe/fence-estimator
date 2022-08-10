const sgMail = require("@sendgrid/mail");
import jsPDF from "jspdf";

const generateMapPdf = async (img, mapElements) => {
  const { table, totalPerimeter } = mapElements;

  let pdf = new jsPDF();
  pdf.setFontSize(12);

  if (img) {
    pdf.addImage(img, "JPEG", 15, 40, 180, 180);
  }

  pdf.addPage();

  pdf.table(10, 10, table, ["name", "length"]);

  pdf.text(
    [`Total: ${totalPerimeter}m`],
    10,
    10 * (mapElements.length + 1) + 20
  );

  return Promise.resolve(pdf);
};

exports.handler = async function (event, context) {
  try {
    const { destination, table, totalPerimeter } = JSON.parse(event.body);
    console.log(`Sending PDF report to ${destination}`);

    const pdf = await generateMapPdf(undefined, { table, totalPerimeter });
    const report = Buffer.from(pdf.output("arraybuffer"));

    sgMail.setApiKey(
      "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"
    );

    const msg = {
      to: destination,
      from: "developer@relashe.com",
      subject: "Fence Estimator - Your Fence",
      text: "Please find your fence data attached",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      attachments: [
        {
          content: report,
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
        body: error.response.body,
      };
    }
  }
};
