const admin = require("firebase-admin");

//Private key to connect to firebase project
const key = require("C:/Users/SHUBHAM SAXENA/Desktop/Web Dev/Headway Consulting/Day 1 PWA/poc-of-pwa2-firebase-adminsdk-cmqsf-0834bb028e.json");

//Initialize app to use admin sdk provided by Firebase
admin.initializeApp({
  credential: admin.credential.cert(key),
});

// This registration token comes from the client FCM SDKs.
// const registrationToken =
//   "dgpyH4Ev19CMx7Ss9nN8Hc:APA91bH2ftHM7w-xVgI4DKInVKXoYzSSsDBbxBx_WsUEhE6Qn404nmhEg_Lben5Xpf2MRrM-tQDRLA86nXEO2Iu80C6US7rrPKiJDnnEBD704YLH6BwjJByfOn8Xxlsf8lfnCiP2t9m4";

// const message = {
//   notification: {
//     title: "Shubham",
//     body: "This is the body of the notification message",
//     image:
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   },
//   data: {
//     url: "https://www.google.com",
//     dataTitle: "Title of the data message",
//     dataBody: "This is the body of the data message",
//     dataImage:
//       "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//   },
//   token: registrationToken,
// };

//This method will compose a message based on the parameters from the form we fill from the console.
function composeMessage(
  message_type,
  title,
  body,
  image,
  url,
  registrationToken
) {
  var message = {};
  if (message_type == "Notification Message") {
    message = {
      notification: {
        title: title,
        body: body,
        image: image,
      },
      token: registrationToken,
    };
  } else if (message_type == "Data Message") {
    message = {
      data: {
        dataTitle: title,
        dataBody: body,
        dataImage: image,
        url: url,
      },
      token: registrationToken,
    };
  }
  console.log(message);
  return message;
}

//This function will actually send the message to the FCM API, which will further send it to the client device.
function sendMessage(message) {
  // Send a message to the device corresponding to the provided
  // registration token.

  //To send the message to multiple devices, use sendMulticast() method (and pass array of tokens) instead of send() method.
  admin
    .messaging()
    .send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log("Successfully sent message:", response);
      return "Successfully sent message";
    })
    .catch((error) => {
      console.log("Error sending message:", error);
      return "Error sent message";
    });
}

// sendMessage(message);

//Exports the functions so that they can be used by server.js
module.exports.sendMessage = sendMessage;
module.exports.composeMessage = composeMessage;
