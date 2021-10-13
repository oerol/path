import Axious from "axios";

const url = "http://localhost:3001/";
const urlCreateQuestion = url + "write";
const urlGetQuestions = url + "read/";
const urlUpdateQuestion = url + "change";
const urlUpdateQuestionStatus = url + "card/updateStatus";
const urlDeleteQuestion = url + "delete/";

const urlCreateDeck = url + "deck/new";
const urlGetAllDecks = url + "deck/all";
const urlGetDeck = url + "deck/";
const urlUpdateDeck = url + "deck/put";

const database = {
  writeToDatabase: function (deck, question, answer) {
    Axious.post(urlCreateQuestion, {
      insertDeck: deck,
      insertQuestion: question,
      insertAnswer: answer,
    }).then(() => {
      alert("wooback baby");
    });
  },
  getQuestions: function (id) {
    return Axious.get(urlGetQuestions + id).then((response) => response.data);
  },
  updateQuestion: function (id, newQuestionText, newAnswerText, newStatus) {
    Axious.put(urlUpdateQuestion, {
      id: id,
      changedStatus: newStatus,
      changedQuestion: newQuestionText,
      changedAnswer: newAnswerText,
    });
  },
  updateQuestionStatus: function (id, newStatus) {
    Axious.put(urlUpdateQuestionStatus, {
      id: id,
      newStatus: newStatus,
    });
  },
  deleteQuestion: function (id) {
    Axious.delete(urlDeleteQuestion + id);
  },
  getDecks: function () {
    return Axious.get(urlGetAllDecks).then((response) => response.data);
  },
  getDeck: function (id) {
    return Axious.get(urlGetDeck + id).then((response) => response.data);
  },
  createDeck: function (title, description) {
    Axious.post(urlCreateDeck, {
      deckTitle: title,
      deckDescription: description,
    });
  },
  updateDeck: function (id, newReviewDate, newStatus) {
    Axious.put(urlUpdateDeck, {
      id: id,
      newReviewDate: newReviewDate,
      newStatus: newStatus,
    });
  },
};

export default database;
