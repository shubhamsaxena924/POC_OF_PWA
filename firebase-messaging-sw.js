importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

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
