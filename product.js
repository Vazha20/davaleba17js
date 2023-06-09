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



const addCart = document.getElementById("addCart");
  addCart.style.display = "none";



const Loading = (state) => {
  if (state == true) {
    const loader = document.getElementById("loader");
    loader.classList.remove("d-none");
  } else {
    const loader = document.getElementById("loader");
    loader.classList.add("d-none"); 
    addCart.style.display= "";
  }

  console.log(state);
};



const product_container = document.getElementById("product_container");
get(ref(database, "products/"))
  .then((snapshot) => {
    if (snapshot.exists()) {
      Loading(true);
      const data = snapshot.val();
      Object.keys(data).map((product) => {         

        const productEl = document.createElement("div");
        productEl.classList.add("col-4");
        productEl.innerHTML = `
       
        <div class="mt-5 productBorder">
            <div class="product_image">
                <img src="${
                  data[product].img != "" && data[product].img != null
                    ? data[product].img
                    : "http://www.listercarterhomes.com/wp-content/uploads/2013/11/dummy-image-square.jpg"
                }"  width="244px" alt="">
            </div>
            <div class="product_info">
                <div class="product_name">${data[product].name}</div>
                <div class="product_price">$${data[product].price}</div>
                <div class="product_price">${data[product].brand}</div>
                <div class="product_price">${data[product].category}</div>
                <div class="product_price"${data[product].color}</div>
                <button class="btn btn-primary clickToCart">Add to Cart</button>
            </div>
        </div>
           
           
            `;
        product_container.appendChild(productEl);
        Loading(false);
      });
    } else {
      const productEl = document.createElement("div");
      productEl.classList.add("col-3");
      productEl.innerHTML = `
        <div class="mt-5">
            <div class="row">
                <div class="col-12">
                    <h1>No Products</h1>
                    <img src="https://cdn.dribbble.com/users/3512533/screenshots/14168376/media/1357b33cb4057ecb3c6f869fc977561d.jpg?compress=1&resize=1600x1200&vertical=center" />
                </div>
            </div>  
        </div>
            `;
      product_container.appendChild(productEl);
    }
  })
  .catch((error) => {
    console.error(error);
    alert(error);
  });

  

  const addProduct = document.getElementById("addProduct");
addProduct.addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "create.html";
});
       
const addToCartButtons = document.querySelectorAll(".clickToCart");
const addCartContainer = document.getElementById("addCart");
const cartCount = document.querySelector(".counter");

let itemCount = 0;

addToCartButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const productInfo = this.parentNode;
    const productName = productInfo.querySelector(".product_name").textContent;
    const productPrice = productInfo.querySelector(".product_price").textContent;

    addToCart(productName, productPrice);
    updateCartCount();
  });
});

function addToCart(productName, productPrice) {
  const cartItem = document.createElement("div");
  cartItem.innerHTML = `
    <div class="mt-3">
      <div class="row">
        <div class="col-12">
          <div class="product_name">${productName}</div>
          <div class="product_price">${productPrice}</div>
        </div>
      </div>  
    </div>
  `;

  addCartContainer.appendChild(cartItem);
}

function updateCartCount() {
  itemCount++;
  cartCount.textContent = itemCount;
}

