import firebase from "firebase/app";
import "firebase-messaging";

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
    "BHuZbsoRnad69LKQkv1oirFLcvn15cuFCtFRYaDmlcl2KEhdljYnTvOaF_lhzL77DonGvkhsIRQk0K3kKasAQT8",
});
messaging
  .requestPermission()
  .then(() => {
    console.log("Have Permission");
  })
  .catch(() => {
    console.log("Error Occured");
  });
