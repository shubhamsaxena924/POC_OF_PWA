// Service Worker Registration
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

//Subscribe function (not needed in firebase)
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

// Static notification display
function displayNotification(e) {
  console.log("called notification");
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification("Hello World! This is website notification!");
    });
  }
}

//function to copy token
function copy() {
  var copyText = document.getElementById("registrationToken");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");
}

// firebase config
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

// get FCM token from firebase
var currentToken;
messaging
  .getToken({
    vapidKey:
      "BPUyrhiJlWNpJU_eJLMl9LBWBX5tMXiR1ezCecG5QFw0PR3v1ElIcw20iqfT_x7wmpGIh2paCBAcYXQL9FRFH1k",
  })
  .then((result) => {
    if (result) {
      console.log(result);
      currentToken = result;
      document
        .getElementById("registrationToken")
        .setAttribute("value", currentToken);
    }
  })
  .catch((err) => {
    console.log(err);
  });
console.log(messaging);

//foreground messaging
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  var body = "";
  var title = "";
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
  if (url != "index.html") {
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
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification(title, options);
    });
  }
});

//firebase hosting:channel:deploy preview-name
//firebase deploy --only hosting
