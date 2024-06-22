const cluster = require("cluster");
const express = require("express");
const os = require("os");
const { kill } = require("process");

const totalCPUs = os.cpus().length; //os.availableParallelism();
const app = express();
const port = 8080;
app.get("/", (req, res) => {
  for (let i = 0; i < 1e8; i++) {}
  res.send({ message: `Hello from express Server ${process.pid}` });
  //after sending response kill that worker
  //   cluster.worker.kill();
  //This function will kill the worker. In the primary worker, it does this by disconnecting the worker.process, and once disconnected, killing with signal. In the worker, it does it by killing the process with signal.

  //The kill() function kills the worker process without waiting for a graceful disconnect, it has the same behavior as worker.process.kill()
});
if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  //fork workers
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork(); //use child_process.fork() method
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker  ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
  app.listen(port);
}

// app.listen(port)

// const dirname=require("path")
// const __dirname=dirname(fileURLToPath(import.meta.url))
// cluster.setupPrimary({
//   exec:__dirname + "/index.js"
// })
// for loop for cluster.fork
//exit event
