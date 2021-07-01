importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

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
