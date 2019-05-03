const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const app = express();
const cors = require("cors");
const uniqid = require("uniqid");
const sgMail = require("@sendgrid/mail");
const keys = require("./apiKeys");

// change below to process.env before deploy

//ONLY EVER PUSH SERVER.JS TO SAFEGUARD KEYS
sgMail.setApiKey(keys.myMailKey);

firebase.initializeApp(keys.config);

const db = firebase.firestore();

app.use(bodyParser.json());
app.use(cors());

app.post("/checklist", (req, res) => {
  const docName = req.body.listName;
  const docRef = db.collection("Checklists").doc(docName);

  docRef
    .get()
    .then(function(doc) {
      if (doc.exists) {
        const list = doc.data();
        res.send(list);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function(error) {
      console.log("Error getting document:", error);
    });
});

app.post("/urgent", (req, res) => {
  const task = req.body;

  db.collection("UrgentTask")
    .doc(`task${uniqid()}`)
    .set({
      task
    })
    .then(function() {
      console.log("Document successfully written!");
      res.send("Document written");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
});

app.get("/urgent", (req, res) => {
  db.collection("UrgentTask")
    .get()
    .then(function(querySnapshot) {
      const urgentList = [];
      querySnapshot.forEach(function(doc) {
        const data = doc.data();
        const dataObject = data.task;
        dataObject.id = doc.id;
        urgentList.push(data.task);
      });
      res.send(urgentList);
    });
});

app.delete("/delete", (req, res) => {
  const id = req.query.id;
  const msg = {
    to: "brandenlacour@gmail.com",
    from: "bar-hero@sample.com",
    subject: `urgent task completed`,
    text: "newest email text",
    html: `<strong>${req.query.user} completed the urgent task "${
      req.query.desc
    }" in room "${req.query.room}" on ${req.query.date}</strong>`
  };
  sgMail.send(msg);

  db.collection("UrgentTask")
    .doc(id)
    .delete()
    .then(function() {
      res.send("successfully deleted");
    })
    .catch(function(error) {
      console.error("Error removing document: ", error);
    });
});

app.get("/", (req, res) => {
  res.send("email sent");
});

app.listen(3001);
