express = require("express");
dotenv = require("dotenv");
const connection = require("./connection");
const cors = require("cors");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT;
const bodyParser = require("body-parser");

const routes = require("./routes");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
dotenv.config();
connection();

app.use(express.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
