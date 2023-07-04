const winston = require("winston");
const rootPath = require("app-root-path");
const ecsFormat = require("@elastic/ecs-winston-format");
const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const { ElasticsearchTransport } = require("winston-elasticsearch");

const esTransportOpts = {
  level: "info", // Specify log level
  client: client, // Elasticsearch client instance
  index: "sample-index", // Index name to store logs
};

// Create Winston logger with Elasticsearch transport
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(), // Log to console
    new ElasticsearchTransport(esTransportOpts), // Log to Elasticsearch
  ],
});

let mydate = new Date();

const filename =
  mydate.getFullYear() +
  "-" +
  (mydate.getMonth() + 1).toString().padStart(2, "0") +
  "-" +
  mydate.getDate().toString().padStart(2, "0") +
  "-";
const logsConfiguration = {
  format: winston.format.combine(
    // winston.format.timestamp(),
    winston.format.json(),
    ecsFormat({ convertReqRes: true })
  ),
  transports: [
    new winston.transports.Console({
      level: "warn",
    }),
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      level: "error",
      filename: `${rootPath}/logs/${filename}error.log`,
    }),
    new winston.transports.File({
      level: "info",
      filename: `${rootPath}/logs/${filename}app.log`,
    }),
  ],
};

// const logger = winston.createLogger(logsConfiguration);

// const myErr =   new Error('Custom Error')
// logger.info('Messageee', {err: myErr})
module.exports = logger;
