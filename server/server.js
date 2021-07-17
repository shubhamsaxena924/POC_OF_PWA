const express = require("express");
const app = express();
const admin = require("./send.js");

//Variables to bes used to compose message
var message_type;
var title;
var body;
var image;
var url;
var registrationToken;

//To parse the body from the url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Page will be sent when we type the url (localhost)
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/adminlogin.html");
});

//When login page is submitted, this is called
app.post("/login", function (req, res) {
  console.log(req.body);
  if (req.body.username == "admin" && req.body.password == "root") {
    res.sendFile(__dirname + "/appserver.html");
  } else {
    res.send(
      '<script>alert("Incorrect Credentials!"); window.location.href = "/"; </script>'
    );
  }
});

//When I send the message from console, this is called
app.post("/sendmessage", function (req, res) {
  console.log(req.body);
  message_type = req.body.message_type;
  registrationToken = req.body.registrationToken;
  if (message_type == "Notification Message") {
    title = req.body.title;
    body = req.body.body;
    image = req.body.image;
  } else {
    title = req.body.dataTitle;
    body = req.body.dataBody;
    image = req.body.dataImage;
    url = req.body.dataLink;
  }
  var message = admin.composeMessage(
    message_type,
    title,
    body,
    image,
    url,
    registrationToken
  );
  admin.sendMessage(message);
  res.send('<script>alert("Sending Message");</script>');
});

app.listen(8080, () => {
  console.log("Listening on port 8080");
});
