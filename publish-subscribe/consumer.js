const amqp = require("amqplib");
connect();

async function connect() {
  try {
    const connection = await amqp.connect(process.env.amqpServer);

    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.consume("jobs", (message) => {
      const input = JSON.parse(message.content.toString());
      console.log(`Recieved job with input ${input.number}`);

      if (input.number == 104) {
        channel.ack(message);
      }
      console.log("waiting for messages...");
    });
  } catch (error) {
    console.log(error);
  }
}

//acknowlege it and pass to different topic
