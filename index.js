const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require("body-parser");

const domains = require("./domains.js");

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Express JS on Vercel");
});

app.get("/screener", function (req, res) {
  res.send({
    id: "abcd-123",
    name: "BPDS",
    disorder: "Cross-Cutting",
    content: {
      sections: [
        {
          type: "standard",
          title:
            "During the past TWO (2) WEEKS, how much (or how often) have you been bothered by the following problems?",
          answers: [
            {
              title: "Not at all",
              value: 0,
            },
            {
              title: "Rare, less than a day or two",
              value: 1,
            },
            {
              title: "Several days",
              value: 2,
            },
            {
              title: "More than half the days",
              value: 3,
            },
            {
              title: "Nearly every day",
              value: 4,
            },
          ],
          questions: [
            {
              question_id: "question_a",
              title: "Little interest or pleasure in doing things?",
            },
            {
              question_id: "question_b",
              title: "Feeling down, depressed, or hopeless?",
            },
            {
              question_id: "question_c",
              title:
                "Sleeping less than usual, but still have a lot of energy?",
            },
            {
              question_id: "question_d",
              title:
                "Starting lots more projects than usual or doing more risky things than usual?",
            },
            {
              question_id: "question_e",
              title:
                "Feeling nervous, anxious, frightened, worried, or on edge?",
            },
            {
              question_id: "question_f",
              title: "Feeling panic or being frightened?",
            },
            {
              question_id: "question_g",
              title: "Avoiding situations that make you feel anxious?",
            },
            {
              question_id: "question_h",
              title:
                "Drinking at least 4 drinks of any kind of alcohol in a single day?",
            },
          ],
        },
      ],
      display_name: "BDS",
    },
    full_name: "Blueprint Diagnostic Screener",
  });
});

const calculateResults = function (req, res, next) {
  const cumulative_values = {
    depression: 0,
    mania: 0,
    substance_use: 0,
    anxiety: 0,
  };

  const level_two_assesments = {
    depression: "PHQ-9",
    mania: "ASRM",
    anxiety: "PHQ-9",
    substance_use: "ASSIST",
  };

  const results = req.body.answers.reduce((acc, cur) => {
    const associatedDomain = domains.find(
      (ele) => ele.question_id === cur.question_id
    ).domain;

    cumulative_values[associatedDomain] += cur.value;

    if (
      cumulative_values[associatedDomain] >= 2 &&
      !acc.includes(level_two_assesments[associatedDomain])
    ) {
      acc.push(level_two_assesments[associatedDomain]);
    }
    return acc;
  }, []);

  console.log(results, "results");
  res.locals.results = results;
  next();
};

app.use(calculateResults);

app.post("/post", (req, res) => {
  response = req.body;
  res.send(JSON.stringify({ results: res.locals.results }));
});

const port = process.env.PORT || 2222;

app.listen(port, (err, res) => {
  if (err) {
    console.log(err);
    return res.status(500).send(err.message);
  } else {
    console.log("[INFO] Server Running on port:", port);
  }
});
