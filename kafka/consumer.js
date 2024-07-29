const { Kafka } = require("kafkajs");
consumer();
async function consumer() {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      brokers: ["sahil-ubuntu:9092"],
    });

    const consumer = kafka.consumer({ groupId: "test" });
    console.log("Connecting....");
    await consumer.connect();
    console.log("Connected!");
    await consumer.subscribe({ topic: "Users", fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(
          `Received Msg from offset ${message.offset} with value ${message.value} on partition ${partition}`
        );
      },
    });
  } catch (error) {
    console.error(`Something Bad Happened ${error}`);
  }
}
