import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBOqjHFUYVb__KNQjqKKUJWOStSmNHYx1Y",
    authDomain: "attr-storage.firebaseapp.com",
    projectId: "attr-storage",
    storageBucket: "attr-storage.appspot.com",
    messagingSenderId: "1073392920477",
    appId: "1:1073392920477:web:e21a387c0fa9b05566f174",
    measurementId: "G-22TWZ2DWZ4",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
