const { jsPDF } = require("jspdf");
var Client = require("ftp");
const parser = require("lambda-multipart-parser");

exports.handler = async function (event, context) {
  try {
    console.log(`Sending PDF report to 91.208.99.4`);

    const { files } = await parser.parse(event);
    console.log(files);

    const pdfBlob = files[0];
    console.log(`arraybuffer`);
    const pdfBuffer = Buffer.from(pdfBlob.content);
    console.log(pdfBuffer);

    var c = new Client();
    c.on("error", (error) => {
      console.log("an ftp error");
      console.log(error);
    });

    c.on("ready", (err) => {
      c.list(function (err, list) {
        if (err) throw err;
        console.dir(list);
        c.end();
      });

      if (err) {
        console.log(`ftp errr`);
        console.log(err);

        throw err;
      }

      console.log(`ftp connection ready`);

      c.put(pdfBuffer, "./test.pdf", (err) => {
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

    c.on("greeting", (message) => {
      console.log(message);
    });

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
