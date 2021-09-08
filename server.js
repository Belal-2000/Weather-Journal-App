const projectData = {};

const ex = require("express");
const app = ex();
// TODO-Start up an instance of app

/* Dependencies */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const axios = require("axios").default;
// use cors
const cors = require("cors");
app.use(cors());

/* Initializing the main project folder */
app.use(ex.static("website"));

const port = 3000;

app.listen(port, () => {
  console.log(`running at port:${port}`);
});

app.get("/all", function (req, res) {
  res.send(projectData);
});

app.post("/postData", (req, res) => {
  projectData["date"] = req.body["date"];
  projectData["temp"] = req.body["temp"];
  projectData["content"] = req.body["content"];
  console.log(projectData);
});
