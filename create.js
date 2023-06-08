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

const productSubmit = document.getElementById("createProd");
// aq minda event listeneris damateba ro yvelaepri wamoigos

productSubmit.addEventListener("click", (e) => {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const brand = document.getElementById("brand").value;
  const category = document.getElementById("category").value;
  const color = document.getElementById("color").value;
  const img = document.getElementById("img").value;

  const uid = Math.floor(Math.random() * 100000000000000000);

  set(ref(database, "products/" + uid), {
    name: name,
    price: price,
    brand: brand,
    category: category,
    color: color,
    img: img,
    random: uid,
  })
    .then(() => {
      alert("Product Added");
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
});
