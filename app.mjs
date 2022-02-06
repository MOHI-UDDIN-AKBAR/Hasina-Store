const logo = document.querySelector("#logo")
// console.log(logo)
logo.addEventListener("click", () => {
    window.location.assign("index.html")
})

function getProductsFromFireStore() {
    db.collection("products").get().then((querySnapshot) => {
        let products = []
        querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data().brand}`);
            products.push({
                id: doc.id,
                ...doc.data(),
            })
            // console.log(products)
        });
        displayProductAtHomePage(products)
    });
}



function addProductInCartSection(product) {
    let cartItem = db.collection("cart-items").doc(product.id)
    cartItem.get()
        .then((doc) => {
            if (doc.exists) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            } else {
                cartItem.set({
                    id: product.id,
                    quantity: 1,
                    ...product
                })
            }
        })

}



function displayProductAtHomePage(products) {
    // console.log(products[0])
    const apple = document.querySelector(".apple")
    const hp = document.querySelector(".hp")
    const asus = document.querySelector(".asus")
    products.forEach(product => {
        let eachItem = document.createElement("div")
        eachItem.classList.add("each-item");
        if (product.brand == "apple") {
            // console.log(product.brand)
            eachItem.innerHTML =
                `
         <img src="${product.image}"
            alt="${product.name}">
        <span>${product.name}</span>
        <span>$${product.price}</span>
        <i class="far fa-heart"></i>  
        `
            let span = document.createElement("span")
            span.innerHTML = `<button title="add-to-cart">Add to cart</button>`
            span.addEventListener("click", () => {
                // console.log(product)
                addProductInCartSection(product)
            })
            eachItem.appendChild(span)
            apple.appendChild(eachItem)
        } else if (product.brand == "hp") {
            eachItem.innerHTML =
                `
     <img src="${product.image}"
        alt="${product.name}">
    <span>${product.name}</span>
    <span>$${product.price}</span>
    <i class="far fa-heart"></i>  
    `
            let span = document.createElement("span")
            span.innerHTML = `<button title="add-to-cart">Add to cart</button>`
            span.addEventListener("click", () => {
                // console.log(product)
                addProductInCartSection(product)

            })
            eachItem.appendChild(span)
            hp.appendChild(eachItem)
        } else if (product.brand == "asus") {
            eachItem.innerHTML =
                `
     <img src="${product.image}"
        alt="${product.name}">
    <span>${product.name}</span>
    <span>$${product.price}</span>
    <i class="far fa-heart"></i>  
        `
            let span = document.createElement("span")
            span.innerHTML = `<button title="add-to-cart">Add to cart</button>`
            span.addEventListener("click", () => {
                // console.log(product)
                addProductInCartSection(product)
            })
            eachItem.appendChild(span)
            asus.appendChild(eachItem)
        }
    })
    eachItem.addEventListener("click", () => {
        export let sendProductInDescriptionPage = product

    })

}












getProductsFromFireStore()