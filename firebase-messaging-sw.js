// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.6.8/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: 'BIxSEIFU6D-KWAbsyfbybW8OldB8EZS1jJ_7nOtuLQOhIv3pwqKEpfdSyQ4pAFDHbzn7bRtBTyTpo_LPfyDYjuQ'
});

const messaging = firebase.messaging();