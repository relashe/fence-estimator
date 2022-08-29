const { jsPDF } = require("jspdf");
var Client = require("ftp");
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
    console.log(`Sending PDF report to 91.208.99.4`);

    const { table, totalPerimeter, files } = await parser.parse(event);
    console.log(files);

    // generate PDF server side
    const pdf = await generateMapPdf(undefined, { JSON.parse(table), totalPerimeter });
    const pdfABuffer = pdf.output("arraybuffer");
    // const pdfBuffer = Buffer.from(pdfABuffer);
    const pdfBuffer = Buffer.from(pdfBlob, "binary");

    console.log(`PDF report: ${pdfBuffer}`);

    var c = new Client();
    c.on("error", (error) => {
      console.log("an ftp error");
      console.log(error);
    });

    c.on("ready", function () {
      console.log(`ftp connection ready`);

      c.put(pdfBuffer, "test.pdf", function (err) {
        console.log(`put completed`);
        if (err) {
          console.log(`ftp error`);
          console.log(err);

          throw err;
        }

        console.log(`ending connection. file sent`);
        c.end();
      });
    });

    console.log(`start ftp connection`);

    c.connect({
      host: "wl23www458.webland.ch",
      user: "www458",
      password: "x5sEFd3Iyjfj",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Hello World" }),
    };
  } catch (error) {
    console.log(`failed on server`);
    console.error(error);

    if (error.response) {
      return {
        statusCode: 500,
        body: JSON.stringify(error.response.body),
      };
    }
  }
};
