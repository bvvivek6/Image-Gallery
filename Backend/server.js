require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const imageRoutes = require("./routes/imageroutes");
const morgan = require("morgan");
const PORT = process.env.PORT || 3000;

require("./models/db"); //connect

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Server is running");
});

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/images", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server runnning on PORT ${PORT}`);
});
