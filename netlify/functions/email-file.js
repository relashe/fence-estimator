const sgMail = require("@sendgrid/mail");
const parser = require("lambda-multipart-parser");

exports.handler = async function (event, context) {
  try {
    const { destination, files } = await parser.parse(event);
    console.log(files);

    const pdfBlob = files[0];
    console.log(`arraybuffer`);
    const pdfBuffer = Buffer.from(pdfBlob.content);
    console.log(pdfBuffer);

    sgMail.setApiKey(
      "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"
    );

    console.log(`about to send`);

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

    await sgMail
      .send(msg)
      .then((response) => {
        return {
          statusCode: 200,
          body: JSON.stringify({ message: "Hello World" }),
        };
      })
      .catch((err) => {
        console.log("falhou");
        console.log(err);

        return {
          statusCode: 500,
          body: JSON.stringify({ message: err }),
        };
      });
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
