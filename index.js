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
    console.log(cumulative_values, "totals");
    return acc;
  }, []);
  
  console.log(results, 'results')
  res.locals.results = results
  console.log(res.locals.results)
  next();
};

app.use(calculateResults);

app.post("/post", (req, res) => {
  // console.log(domains);
  // Prepare output in JSON format
  console.log(res.locals.results, 'resssssults')
  response = req.body;
  // console.log(response);
  res.end(JSON.stringify({"results": res.locals.results}));
  // let data = req.body;
  // res.send("Data Received: " + JSON.stringify(data.title));
  // //create a json response
  // requestAsJson = JSON.stringify(req.body);

  // //set the appropriate HTTP header
  // res.setHeader("Content-Type", "application/json");

  // //log the output
  // console.log("The POST data received was: " + requestAsJson);

  // //send the POST data back as JSON
  // res.end(requestAsJson);
});

app.listen(2222);
