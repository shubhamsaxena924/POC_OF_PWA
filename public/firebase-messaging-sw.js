importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

// firebse config
var firebaseConfig = {
  apiKey: "AIzaSyBT5YwAOSLITxfvA5csCEavacoKOK6hlSs",
  authDomain: "poc-of-pwa2.firebaseapp.com",
  projectId: "poc-of-pwa2",
  storageBucket: "poc-of-pwa2.appspot.com",
  messagingSenderId: "984273343780",
  appId: "1:984273343780:web:15d1b2c5433f911737cfb1",
  measurementId: "G-J3H1EDK56E",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Background Messaging handler (For data messages, Firebase itself shows a notification for notification message)
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var body = "";
  var title = "No Title";
  var image = "";
  var url = "index.html";
  var action = [{ action: "close", title: "Close" }];

  if (payload.data) {
    title = payload.data.dataTitle;
    body = payload.data.dataBody;
    image = payload.data.dataImage;
    if (payload.data.url != "") url = payload.data.url;
  }

  if (payload.notification) {
    if (payload.notification.title) {
      title = payload.notification.title;
    }
    body = payload.notification.body;
    image = payload.notification.image;
  }
  if (url != "") {
    action = [
      { action: "open", title: "Open" },
      { action: "close", title: "Close" },
    ];
  }

  var options = {
    body: body,
    icon: image,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      url: url,
    },
    actions: action,
  };
  if (Notification.permission === "granted") {
    self.registration.showNotification(title, options);
    console.log(url);
  }
});

//Notification click handler for background messaging
self.addEventListener("notificationclick", function (e) {
  var notification = e.notification;
  var action = e.action;

  if (action === "close") {
    notification.close();
    console.log("Closed Notification from f-m-sw");
  } else {
    console.log(e);
    console.log(notification);
    clients.openWindow(notification.data.url);
    notification.close();
  }
});
