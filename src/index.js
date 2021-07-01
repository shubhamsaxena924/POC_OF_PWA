if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../sw.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);

      //For push subscription
      // registration.pushManager.getSubscription().then(function (sub) {
      //   if (sub === null) {
      //     // Update UI to ask user to register for Push
      //     console.log("Not subscribed to push service!");
      //     subscribeUser();
      //   } else {
      //     // We have a subscription, update the database
      //     console.log("Subscription object: ", sub);
      //   }
      // });
      //Till here
    })
    .catch((error) => {
      console.log("SW Registration failed!");
      console.log(error);
    });
} else {
  ("Service Worker not supported!");
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then((registration) => {
      console.log("SW Registered!");
      console.log(registration);
    })
    .catch((error) => {
      console.log("Firebase SW Registration failed!");
      console.log(error);
    });
} else {
  ("Service Worker not supported!");
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

// Notification.requestPermission((status) => {
//   console.log("notification permission status:", status);
// });

function displayNotification() {
  console.log("called notification");
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification("Hello World!");
    });
  }
}

var firebaseConfig = {
  apiKey: "AIzaSyDafD87TQqvpaxC9VfLaT8h9YqXfwpjrsc",
  authDomain: "poc-of-pwa.firebaseapp.com",
  projectId: "poc-of-pwa",
  storageBucket: "poc-of-pwa.appspot.com",
  messagingSenderId: "403174100075",
  appId: "1:403174100075:web:167c5a6053591d7803f52e",
  measurementId: "G-VJB3JPHG2V",
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.getToken({
  vapidKey:
    "BC93BDADTY26RbvAEvGuqxXJmi_gbqEmFDvg054aXCyZ0eJlyXDvj9Od15SwT3iiA1sg14QHFmmhr5rsmmmQjRA",
});
console.log(messaging);
messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
});
