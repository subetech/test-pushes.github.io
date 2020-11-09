// firebase_subscribe.js

firebase.initializeApp({
    apiKey: "AIzaSyDXOA6BWVhQyCmexM-a9uSoJVO8qc_GiOM",
    authDomain: "skillbox-messages-test-x1j24l.firebaseapp.com",
    databaseURL: "https://skillbox-messages-test-x1j24l.firebaseio.com",
    projectId: "skillbox-messages-test-x1j24l",
    storageBucket: "skillbox-messages-test-x1j24l.appspot.com",
    messagingSenderId: "819128614489",
    appId: "1:819128614489:web:771a6906e816ffa9c97b48",
    measurementId: "G-8CNLPYH8PS"

});

// браузер поддерживает уведомления
// вообще, эту проверку должна делать библиотека Firebase, но она этого не делает

if ('Notification' in window) {
    var messaging = firebase.messaging();

    // пользователь уже разрешил получение уведомлений
    // подписываем на уведомления если ещё не подписали
    // if (Notification.permission === 'granted') {
    //     example1.methods.subscribe();
    // }

    // по клику, запрашиваем у пользователя разрешение на уведомления
    // и подписываем его
}

function getToken(){
    const someToken = window.localStorage.getItem('sentFirebaseMessagingToken')
    return someToken ? someToken : ""
}


// отправка ID на сервер
function sendTokenToServer(currentToken) {
    if (!isTokenSentToServer(currentToken)) {
        console.log('Отправка токена на сервер...');

        // var url = ''; // адрес скрипта на сервере который сохраняет ID устройства
        // $.post(url, {
        //     token: currentToken
        // });

        setTokenSentToServer(currentToken);
    } else {
        console.log('Токен уже отправлен на сервер.');
    }
}

// используем localStorage для отметки того,
// что пользователь уже подписался на уведомления
function isTokenSentToServer(currentToken) {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken;
}

function setTokenSentToServer(currentToken) {
    window.localStorage.setItem(
        'sentFirebaseMessagingToken',
        currentToken ? currentToken : ''
    );
}

const someButton = new Vue({
    el: '#container',
    data: {
        token: ""
    },
    methods: {
        subscribe: function () {
            navigator.serviceWorker.register('firebase-messaging-sw.js').then(function (registration) {
                // запрашиваем разрешение на получение уведомлений
                messaging.requestPermission()
                    .then(function () {
                        // получаем ID устройства
                        messaging.getToken({
                            serviceWorkerRegistration: registration
                        })
                            .then(function (currentToken) {
                                console.log(currentToken);

                                if (currentToken) {
                                    sendTokenToServer(currentToken);
                                } else {
                                    console.warn('Не удалось получить токен.');
                                    setTokenSentToServer(false);
                                }
                            })
                            .catch(function (err) {
                                console.warn('При получении токена произошла ошибка.', err);
                                setTokenSentToServer(false);
                            });
                    })
                    .catch(function (err) {
                        console.warn('Не удалось получить разрешение на показ уведомлений.', err);
                    });
            })
        }

    }
})

