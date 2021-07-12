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

//Background Messaging handler (For data messages, Firebase itself shows a notification for notification message)
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  var body;

  if (payload.notification) {
    body = payload.notification.body;
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
      link: payload.data.link,
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
        icon: "",
      },
      { action: "close", title: "Close", icon: "" },
    ],
  };
  if (Notification.permission === "granted") {
    self.registration.showNotification(payload.notification.title, options);
    var targetLink = payload.data.link;
    console.log(targetLink);
  }
});

//Notification click handler for background messaging
self.addEventListener("notificationclick", function (e) {
  var notification = e.notification;
  // var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === "close") {
    notification.close();
    console.log("Closed Notification from f-m-sw");
  } else {
    console.log(e);
    console.log(notification);
    clients.openWindow(notification.data.link);
    notification.close();
  }
});
