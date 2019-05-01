const express = require("express");
const bodyParser = require("body-parser");
const firebase = require("firebase");
const app = express();
const cors = require("cors");
const uniqid = require("uniqid");

const config = {
  apiKey: "AIzaSyCHQwzWcJaeVEmAvqq_tCULDIKcqz_cHGo",
  authDomain: "bar-hero.firebaseapp.com",
  databaseURL: "https://bar-hero.firebaseio.com",
  projectId: "bar-hero",
  storageBucket: "bar-hero.appspot.com",
  messagingSenderId: "278188655935"
};

firebase.initializeApp(config);

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
        console.log("Document data:", doc.data());
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
  console.log(task, "is the task ");
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
  console.log("ran", id);
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
  res.send("Home");
});

app.listen(3001);
