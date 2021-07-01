importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyDafD87TQqvpaxC9VfLaT8h9YqXfwpjrsc",
  authDomain: "poc-of-pwa.firebaseapp.com",
  projectId: "poc-of-pwa",
  storageBucket: "poc-of-pwa.appspot.com",
  messagingSenderId: "403174100075",
  appId: "1:403174100075:web:1a35e8fe6db3650c03f52e",
  measurementId: "G-VNM9F0EFDH",
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
