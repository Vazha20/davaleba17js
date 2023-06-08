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

const email = document.getElementById("email");
const password = document.getElementById("password");
const retypePassword = document.getElementById("retypePassword");
const name = document.getElementById("name");
const surname = document.getElementById("surname");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Validate password match
  if (password.value !== retypePassword.value) {
    alert("Passwords do not match");
    return;
  }

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;

      // Update additional user details
      return updateAdditionalUserDetails(user, name.value, surname.value)
        .then(() => {
          // Signed in and additional details updated successfully
          localStorage.setItem("accessToken", user.accessToken);
          console.log(user);
          window.location.href = "admin.html";
        })
        .catch((error) => {
          console.log("Error updating additional user details:", error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Registration error:", errorCode, errorMessage);
    });
});

function updateAdditionalUserDetails(user, name, surname) {
  const userId = user.uid;
  const userRef = ref(database, `users/${userId}`);
  
  // Update name and surname fields in the database
  return set(userRef, {
    name: name,
    surname: surname
  });
}

const loginLink = document.getElementById("loginLink");
loginLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "index.html";
});
