const { jsPDF } = require("jspdf");
var Client = require("ftp");
const fs = require("fs");
const Busboy = require("busboy");

const parseMultipartForm = (event) => {
  return new Promise((resolve) => {
    console.log(`parsing`);
    console.log(`${event.params?.boudary}`);
    console.log(`${event.headers}`);

    // we'll store all form fields inside of this
    const fields = {};

    // let's instantiate our busboy instance!
    const bb = new Busboy({
      // it uses request headers
      // to extract the form boundary value (the ----WebKitFormBoundary thing)
      headers: event.headers,
    });

    // before parsing anything, we need to set up some handlers.
    // whenever busboy comes across a file ...
    bb.on(
      "file",
      (fieldname, filestream, filename, transferEncoding, mimeType) => {
        // ... we take a look at the file's data ...
        console.log(`filename: ${filename}`);
        filestream.on("data", (data) => {
          // ... and write the file's name, type and content into `fields`.
          fields[fieldname] = {
            filename,
            type: mimeType,
            content: data,
          };
        });

        filestream.on("error", (err) => {
          console.log(`bb file error: ${err}`);
        });
      }
    );

    // whenever busboy comes across a normal field ...
    bb.on("field", (fieldName, value) => {
      console.log(`field: ${fieldName}`);
      // ... we write its value into `fields`.
      fields[fieldName] = value;
    });

    bb.on("error", (error) => {
      console.log(`bb error: ${error}`);
    });

    // once busboy is finished, we resolve the promise with the resulted fields.
    bb.on("finish", () => {
      console.log(`finished form`);
      resolve(fields);
    });

    // now that all handlers are set up, we can finally start processing our request!
    bb.write(event.body);

    // bb.end();
  });
};

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
    const { table, totalPerimeter, pdfBlob } = await parseMultipartForm(event);
    // const {destination, table, totalPerimeter, aBuffer } = JSON.parse(
    //   event.body
    // );

    // generate PDF server side
    const pdf = await generateMapPdf(undefined, { table, totalPerimeter });
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
