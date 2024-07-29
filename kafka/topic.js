const { Kafka } = require("kafkajs");

run();

async function run() {
  try {
    const kafka = new Kafka({
      clientId: "my-app",
      //   brokers: ["kafka1:9092", "kafka2:9092"],
      brokers: ["sahil-ubuntu:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting....");
    await admin.connect();
    console.log("Connected!");
    //network call
    //A-M, N-Z
    await admin.createTopics({
      topics: [
        {
          topic: "Users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created Successfully");
    await admin.disconnect();
  } catch (error) {
    console.error(`Something Bad Happened ${error}`);
  } finally {
    process.exit(0);
  }
}
