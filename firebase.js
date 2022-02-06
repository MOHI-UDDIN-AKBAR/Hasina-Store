// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyPxa626wH9uCup_S4CfEpcyg9iB9a8mw",
    authDomain: "hasina-store-11399.firebaseapp.com",
    projectId: "hasina-store-11399",
    storageBucket: "hasina-store-11399.appspot.com",
    messagingSenderId: "32506314025",
    appId: "1:32506314025:web:538c5539ad22b92441cb38",
    measurementId: "G-MZ6E9HSRSC"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();