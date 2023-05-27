const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");

const domains = require("./domains.js");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("Hello World");
});

const calculateResults = function (req, res, next) {
  const cumulative_values = {
    depression: 0, 
    mania: 0, 
    substance_use: 0, 
    anxiety: 0
  };

  const level_two_assesments = {
    depression: 'PHQ-9',
    mania: 'ASRM',
    anxiety: 'PHQ-9',
    substance_use: 'ASSIST'
  }

  const results = req.body.answers.reduce((acc, cur) => {
    const associatedDomain = domains.find(
      (ele) => ele.question_id === cur.question_id
    ).domain

    cumulative_values[associatedDomain] += 1;
    
    if (cumulative_values[associatedDomain] >=2 && !acc.includes(level_two_assesments[associatedDomain])) {
      acc.push(level_two_assesments[associatedDomain]);
    }
    return acc;
  }, []);
  
  console.log(results, 'results')
  res.locals.results = results
  next();
};

app.use(calculateResults);

app.post("/post", (req, res) => {
  response = req.body;
  res.end(JSON.stringify({"results": res.locals.results}));
});

app.listen(2222);
