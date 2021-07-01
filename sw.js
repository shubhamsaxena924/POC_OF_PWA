const cacheName = "cache-v2"; //you may give any name
const resourcesToPrecache = [
  "/",
  "./index.html",
  "./src/index.js",
  "./src/index.css",
  "./images/logo192.png",
  "./images/logo512.png",
];

//self here is sw object
self.addEventListener("install", (event) => {
  console.log("Installing!");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(resourcesToPrecache);
    })
  );
});
//cache variable inside then() stores the cache object returned by the caches.open()
//caches.open will return immediately even if the cache is not yet ready.
//So we make it wait, by event.waitUntil()

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      Promise.all(
        keys
          .filter((key) => key !== cacheName)
          .map((key) => {
            caches.delete(key);
          })
      );
    })
  );
  console.log("Service Worker has been activated");
});

//now we have stored the data in cache, now it needs to be fetched,
//'fetch' event object has a request key, whih stores the url/file being requested from network.
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
//if the cache doesnt have any data, then null is stored in cachedResponse variable
//if cachedResponse has data it is returned, if it stores null, then
//fetch(event.request) is called. (network)
//This is known as cache-first methodology.

//Responding to push event
self.addEventListener("push", function (e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = "Push message no payload";
  }

  var options = {
    body: body,
    icon: "images/example.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: "2",
    },
    actions: [
      {
        action: "explore",
        title: "Explore this new world",
        icon: "images/checkmark.png",
      },
      { action: "close", title: "Close", icon: "images/xmark.png" },
    ],
  };
  e.waitUntil(self.registration.showNotification("Hello world!", options));
});

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
