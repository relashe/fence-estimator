const sgMail = require("@sendgrid/mail");

exports.handler = async function (event, context) {
  try {
    const { destination } = JSON.parse(event.body);
    console.log(`Sending PDF report to ${destination}`);

    // const report = Buffer.from(content);

    sgMail.setApiKey(
      "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"
    );

    const msg = {
      to: destination,
      from: "developer@relashe.com",
      subject: "Fence Estimator - Your Fence",
      text: "Please find your fence data attached",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
      // attachments: [
      //   {
      //     content: report,
      //     filename: "attachment.pdf",
      //     type: "application/pdf",
      //     disposition: "attachment",
      //   },
      // ],
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
