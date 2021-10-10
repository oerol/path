const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "express_database",
});

connection.connect(function (error) {
  if (error) throw error;
  console.log("Connected!");
  var sql =
    "CREATE TABLE IF NOT EXISTS questions (id INT AUTO_INCREMENT PRIMARY KEY, deck INT, status INT, question VARCHAR(255), answer VARCHAR(255))";
  connection.query(sql, function (error) {
    if (error) throw error;
  });

  const createDeckTable =
    "CREATE TABLE IF NOT EXISTS decks (id INT AUTO_INCREMENT PRIMARY KEY, module INT, title VARCHAR(255), description VARCHAR(255), dateCreated DATE, reviewStatus INT, nextReviewDate DATE)";
  connection.query(createDeckTable);

  const checkIfEmpty = "SELECT COUNT(*) AS rowCount FROM questions";
  connection.query(checkIfEmpty, (error, results) => {
    if (results[0].rowCount === 0) {
      console.log("Creating a base question..");
      const createEmptyQuestion =
        "INSERT INTO questions (deck, status, question, answer) VALUES (1,0,'Was könnte deine erste Frage sein?', 'Die Antwort befindet sich auf deiner Hand')";
      connection.query(createEmptyQuestion);
    }
  });
});

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Server hier.. Bitte helfen Sie mir.. Ich sterbe.." });
  connection.connect();

  connection.query(
    "SELECT 1 + 1 AS solution",
    function (error, results, fields) {
      if (error) throw error;
      console.log("The solution is: ", results[0].solution);
    }
  );

  connection.end();
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/write", (req, res) => {
  const insertQuestion = req.body.insertQuestion;
  const insertAnswer = req.body.insertAnswer;
  const databaseInsert =
    "INSERT INTO questions (deck, status, question, answer) VALUES (?,?,?,?)";
  connection.query(
    databaseInsert,
    [1, 0, insertQuestion, insertAnswer],
    (err, result) => {
      if (err) console.log(err);
    }
  );
});

app.get("/read", (req, res) => {
  connection.query("SELECT * FROM questions", (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

app.put("/change", (req, res) => {
  const id = req.body.id;

  const changedQuestion = req.body.changedQuestion;
  const changedAnswer = req.body.changedAnswer;
  const changedStatus = req.body.changedStatus;

  const databaseUpdate =
    "UPDATE questions SET status = ?, question= ?, answer = ? WHERE id = ?";

  connection.query(
    databaseUpdate,
    [changedStatus, changedQuestion, changedAnswer, id],
    (err, result) => {
      res.sendStatus(200);
      if (err) console.log(err);
    }
  );
});

app.delete("/delete/:questionId", (req, res) => {
  const deleteId = req.params.questionId;
  const databaseDelete = "DELETE FROM questions WHERE id = ?";

  connection.query(databaseDelete, deleteId, (err, result) => {
    res.sendStatus(200);

    console.log("Deleted question with the id of: " + deleteId);
    if (err) console.log(err);
  });
});

/* DECKS */

app.post("/deck/new", (req, res) => {
  const deckTitle = req.body.deckTitle;
  const deckDescription = req.body.deckDescription;

  let today = new Date().toISOString().slice(0, 10);

  const databaseInsert =
    "INSERT INTO decks (module, title, description, dateCreated, reviewStatus, nextReviewDate) VALUES (?,?,?,?,?,?)";
  connection.query(
    databaseInsert,
    [1, deckTitle, deckDescription, today, 0, today],
    (err, result) => {
      res.sendStatus(200);
      if (err) console.log(err);
    }
  );
});

app.get("/deck/all", (req, res) => {
  connection.query("SELECT * FROM decks", (err, result) => {
    err ? console.log(err) : res.send(result);
  });
});

app.get("/deck/:deckId", (req, res) => {
  const deckId = req.params.deckId;

  connection.query(
    "SELECT * FROM questions WHERE deck = ?",
    deckId,
    (err, result) => {
      res.sendStatus(200);

      if (err) console.log(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server gestartet auf Port ${PORT}.`);
});
