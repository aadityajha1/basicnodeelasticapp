const winston = require("winston");
const rootPath = require("app-root-path");
const ecsFormat = require("@elastic/ecs-winston-format");
let logger;
try {
  const { ElasticsearchTransport } = require("winston-elasticsearch");

  const esTransportOpts = {
    // level: ["info", "warn", "error"], // Specify log level
    level: "info",
    clientOpts: {
      node: "http://localhost:9200",
      auth: {
        username: "elastic",
        password: "mx8L6IituqJHXsjoijd+",
      },
    }, // Elasticsearch client instance
    index: "sample-index", // Index name to store logs
    wait_for_active_shards: 1,
    // ensureMappingTemplate: true,
  };

  // Create Winston logger with Elasticsearch transport
  logger = winston.createLogger({
    transports: [
      new winston.transports.Console(), // Log to console
      new ElasticsearchTransport(esTransportOpts), // Log to Elasticsearch
    ],
  });
} catch (error) {
  console.error("Elasticsearch connection failed:", error);
}

logger.info("Hello how are you");
logger.error("Sample error");
logger.warn("Sample warning message: ");
logger.info("Sample warning message 2222222222222222");
// let mydate = new Date();

// const filename =
//   mydate.getFullYear() +
//   "-" +
//   (mydate.getMonth() + 1).toString().padStart(2, "0") +
//   "-" +
//   mydate.getDate().toString().padStart(2, "0") +
//   "-";
// const logsConfiguration = {
//   format: winston.format.combine(
//     // winston.format.timestamp(),
//     winston.format.json(),
//     ecsFormat({ convertReqRes: true })
//   ),
//   transports: [
//     new winston.transports.Console({
//       level: "warn",
//     }),
//     new winston.transports.Console({
//       level: "info",
//     }),
//     new winston.transports.File({
//       level: "error",
//       filename: `${rootPath}/logs/${filename}error.log`,
//     }),
//     new winston.transports.File({
//       level: "info",
//       filename: `${rootPath}/logs/${filename}app.log`,
//     }),
//   ],
// };

// const logger = winston.createLogger(logsConfiguration);

// const myErr =   new Error('Custom Error')
// logger.info('Messageee', {err: myErr})
module.exports = logger;
