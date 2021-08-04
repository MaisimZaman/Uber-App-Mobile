import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAJVAj_qBGE9sRySqh13mQ4z3Ei-HkDMJw",
    authDomain: "uber-app-973be.firebaseapp.com",
    projectId: "uber-app-973be",
    storageBucket: "uber-app-973be.appspot.com",
    messagingSenderId: "628595923936",
    appId: "1:628595923936:web:9793cb0179d0ad1d36e985",
    measurementId: "G-F8W19Q7X57"
};

let app;

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app();

}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth}