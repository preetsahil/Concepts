const amqp = require("amqplib");
const dotenv = require("dotenv");

const msg = { number: process.argv[2] };
dotenv.config({ path: "./.env" });
connect();

async function connect() {
  try {
    const connection = await amqp.connect(process.env.amqpServer);
    const channel = await connection.createChannel();
    await channel.assertQueue("jobs");
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(msg)));
    await channel.close();
    await connection.close();
  } catch (error) {
    console.log(error);
  }
}
