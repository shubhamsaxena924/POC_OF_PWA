if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../sw.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("SW Registration failed!");
      console.log(error);
    });
} else {
  console.log("Service Worker not supported!");
}

//Subscribe function
function subscribeUser() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then(function (reg) {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
        })
        .then(function (sub) {
          console.log("Endpoint URL: ", sub.endpoint);
        })
        .catch(function (e) {
          if (Notification.permission === "denied") {
            console.warn("Permission for notifications was denied");
          } else {
            console.error("Unable to subscribe to push", e);
          }
        });
    });
  }
}

function displayNotification(e) {
  console.log("called notification");
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification("Hello World! This is website notification!");
    });
  }
}

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

var currentToken;
messaging
  .getToken()
  .then((result) => {
    if (result) {
      console.log(result);
      currentToken = result;
    }
  })
  .catch((err) => {
    console.log(err);
  });
console.log(messaging);

//foreground messaging
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  var body;

  if (payload.notification) {
    body = payload.notification.body;
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "../images/logo192.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
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
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification(payload.notification.title, options);
    });
  }
});