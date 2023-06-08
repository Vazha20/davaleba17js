import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-auth.js";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";
import { ref as sRef } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAmJyDk5JlDiPZUqOjU-wUifJJPkDgDqgY",

  authDomain: "comm101-cf4f0.firebaseapp.com",

  projectId: "comm101-cf4f0",

  storageBucket: "comm101-cf4f0.appspot.com",

  messagingSenderId: "1074741211265",

  appId: "1:1074741211265:web:ae1eadcfc1a716993a5d80",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

///////// Sign In //////////

const signEmail = document.getElementById("signemail");
const signPassword = document.getElementById("signpassword");
const signIn = document.getElementById("signIn");

signIn.addEventListener("submit", (e) => {
  e.preventDefault();
  signInWithEmailAndPassword(auth, signEmail.value, signPassword.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.accessToken);
      localStorage.setItem("accessToken", user.accessToken);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});

if (localStorage.getItem("accessToken")) {
  window.location.href = "admin.html";
} else {
  alert("You are not logged in!");
}

const registerLink = document.getElementById("registerLink");
registerLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "register.html";
});