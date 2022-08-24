const sgMail = require("@sendgrid/mail");
const { jsPDF } = require("jspdf");
var Client = require("ftp");
const fs = require("fs");

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
    const { destination, table, totalPerimeter } = JSON.parse(event.body);
    console.log(`Sending PDF report to 91.208.99.4`);

    const pdf = await generateMapPdf(undefined, { table, totalPerimeter });
    const pdfBuffer = pdf.output("arraybuffer");

    console.log(`PDF report: ${pdfBuffer}`);

    var c = new Client();
    c.on("ready", function () {
      c.put(pdfBuffer, "/public_html/pdfs/test.pdf", function (err) {
        if (err) {
          console.log(`error`);
          console.log(err);

          throw err;
        }

        c.end();
      });
    });
    // connect to localhost:21 as anonymous
    c.connect({
      host: "91.208.99.4",
      user: "www458@mountainpartners.relashe.com",
      password: "x5sEFd3Iyjfj",
    });

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
