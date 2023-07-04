const express = require("express");
const app = express();
const http = require("http");
const jsonwebtoken = require("jsonwebtoken");
// const apm = require("elastic-apm-node").start({
//   secretToken: "i0hqqMAy9ULTsaYAPS",
//   serverUrl:
//     "https://696740d05f484f1dabe3568093762b6e.apm.us-central1.gcp.cloud.es.io:443",
//   environment: "my-environment",
//   serviceName: "local-testing",
//   centralConfig: false,
//   captureExceptions: false,
//   metricsInterval: 0,
// });

const products = require("./products.json");
const usersRouter = require("./routes/users");
const logger = require("./logger");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
logger.info(`Logger initialized`);
app.set("view engine", "ejs");
app.use(express.static("public"));

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  // res.status(400).send('Error')
  next();
};
const handler = (req, res) => {
  res.setHeader("Foo", "Bar");
  // res.end('ok')
  logger.info("Handled Request ", { req, res });
  // next()
};

const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgress",
  password: "password",
  port: 5432,
});

app.use("/users", usersRouter);
app.get("/", (req, res, next) => {
  // console.log(products)
  logger.info("-----------", req.body);

  // console.log(req.body)
  // res.setHeader('Content-Type', 'application/json')
  // res.json({products})
  res.sendFile(__dirname + "/public/index.html");
});

app.use(errorHandler);
const server = http.createServer(app);
server.listen(8000, () => {
  const port = server.address().port;

  logger.info(`The App is listening at http://localhost:${port}`);
});
