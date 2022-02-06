const logo = document.querySelector("#logo")
// console.log(logo)
logo.addEventListener("click", () => {
    window.location.assign("index.html")
})



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

function addProductInCartSectionFromDescriptionSection(productId, productDetails) {
    let cartItem = db.collection("cart-items").doc(productId)
    cartItem.get()
        .then((doc) => {
            if (doc.exists) {
                cartItem.update({
                    quantity: doc.data().quantity + 1
                })
            } else {
                cartItem.set({
                    id: productId,
                    quantity: 1,
                    ...productDetails
                })
            }
        })

}

function sendDetailsToDetailsSection(productId) {
    const description = document.querySelector(".description")
    description.classList.remove("active")
    window.scrollTo(0, 0)
    db.collection("products").doc(productId).get()
        .then((doc) => {
            description.innerHTML = `
            <div class="image">
                <img src="${doc.data().image}"
                alt="${doc.data().name}">
                </div>
                <div class="product-details">
                <h1>${doc.data().name}</h1>
                <span>${doc.data().cpu!=""?doc.data().cpu:""}</span>
                <span>${doc.data().gpu}</span>
                <span>${doc.data().memory!=""?doc.data().memory:""}</span>
                <span>${doc.data().ssd!=""?doc.data().ssd:""}</span>
                <small>${doc.data().display!=""?doc.data().display:""}</small>
                <small>${doc.data().detail_1!=""?doc.data().detail_1:""}</small>
                <small>${doc.data().keyboard!=""?doc.data().keyboard:""}</small>
                <small>${doc.data().touch!=""?doc.data().touch:""}</small>
                <small>${doc.data().storage!=""?doc.data().storage:""}</small>
                <h2 class="price">$${doc.data().price}</h2>
                </div>
            `
            const productDetails = document.querySelector(".description .product-details")
            let createButtonForDescription = document.createElement("button")
            createButtonForDescription.innerText = `Add to cart
                    `
            createButtonForDescription.addEventListener("click", () => {
                // addProductInCartSection(doc.data())
                console.log(doc.id)
                console.log(doc.data())
                addProductInCartSectionFromDescriptionSection(doc.id, doc.data())

            })
            productDetails.appendChild(createButtonForDescription)
        })

}

function addProductInLikedPage(productId) {
    let allProduct = db.collection("products").doc(productId)
    allProduct.get()
        .then((product) => {
            let likedItem = db.collection("liked-products").doc(product.id)
            likedItem.get()
                .then((doc) => {
                    if (doc.exists) {
                        // cartItem.update({
                        //     quantity: doc.data().quantity + 1
                        // })
                        console.log("it already here")
                    } else {
                        likedItem.set({
                            id: product.id,
                            ...product.data()
                        })
                    }
                })
        })
}


function displayProductAtProductPage(products) {
    const allItems = document.querySelector(".all-items")
    products.forEach(product => {
        let eachItem = document.createElement("div")
        eachItem.classList.add("each-item")
        eachItem.innerHTML = `
        <img src="${product.image}"
        alt="${product.name}"  data-id="${product.id}" >
    <span>${product.name}</span>
    <span>$${product.price}</span>
    
    <span class="likedProduct" data-id="${product.id}"><i class="fas fa-heart"></i>  </span>        
        `
        const allImageFromProductPage = document.querySelectorAll(".each-item img")
        allImageFromProductPage.forEach(img => {
            img.addEventListener("click", () => {
                console.log(img.dataset.id)
                sendDetailsToDetailsSection(img.dataset.id)
            })
        })

        let span = document.createElement("span")
        span.innerHTML = `<button title="add-to-cart">Add to cart</button>`
        span.addEventListener("click", () => {
            // console.log(product)
            addProductInCartSection(product)
        })
        eachItem.appendChild(span)

        allItems.appendChild(eachItem)
    })
    getLikedProduct()
    getLikedProductFromFireStore()
}


function cancelItemFromLikedProductList(productId) {
    db.collection("liked-products").doc(productId).delete()
}

function getLikedProduct() {
    const getAllLikedProducts = document.querySelectorAll(".likedProduct")
    getAllLikedProducts.forEach(item => {
        const heart = item.querySelector(".fa-heart")
        item.addEventListener("click", () => {
            // console.log(item.dataset.id)
            // console.log(product)
            if (heart.classList.contains("likedProductColor")) {
                heart.classList.remove("likedProductColor")
                cancelItemFromLikedProductList(item.dataset.id)

            } else {

                heart.classList.add("likedProductColor")
                addProductInLikedPage(item.dataset.id)
            }
        })
    })
}


function getLikedProductFromFireStore() {
    db.collection("liked-products").onSnapshot(snapshot => {
        const getAllLikedProducts = document.querySelectorAll(".likedProduct")
        snapshot.forEach(doc => {
            getAllLikedProducts.forEach(product => {
                const heart = product.querySelector(".fa-heart")
                if (product.dataset.id == doc.id) {
                    heart.classList.add("likedProductColor")
                }
            })
        })

    })
}


function getItemFromLocalStorage() {

    const storeDataOfSearchItem = JSON.parse(localStorage.getItem("SearchData"))
    const textMessage = JSON.parse(localStorage.getItem("message"))
    // console.log(storeDataOfSearchItem[0])
    console.log(textMessage)
    if (storeDataOfSearchItem[0] == undefined) {
        console.log("nothing")
        const allItems = document.querySelector(".all-items")
        allItems.innerHTML = textMessage
        // allItems.style.width = "500vh"
    }
    displayProductAtProductPage(storeDataOfSearchItem)
}
getItemFromLocalStorage()