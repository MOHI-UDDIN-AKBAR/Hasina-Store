function moveToHomePage() {
    const home = document.getElementById("home")
    const home1 = document.getElementById("home1")

    home.addEventListener("click", () => {
        const mainSection = document.querySelector(".main-section")
        const allItems = document.querySelector(".items")
        const description = document.querySelector(".description")
        description.classList.add("active")
        allItems.classList.remove("active")
        mainSection.classList.remove("active")
    })
    home1.addEventListener("click", () => {
        const mainSection = document.querySelector(".main-section")
        const allItems = document.querySelector(".items")
        const description = document.querySelector(".description")
        description.classList.add("active")
        allItems.classList.remove("active")
        mainSection.classList.remove("active")
    })
}



moveToHomePage()




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
    // console.log(product.image)

    const description = document.querySelector(".description")
    description.classList.remove("active")
    window.scrollTo(0, 0);
    let selectedProduct = db.collection("products").doc(productId)
    selectedProduct.get()
        .then(doc => {
            console.log(doc.data().name)
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
            // <button title="add-to-cart">Add to cart</button>
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



function getTheLocationOfAllImage() {

    const image = document.querySelectorAll(".each-item .imageForDetails")
    // console.log(image)
    image.forEach(img => {
        img.addEventListener("click", () => {
            const mainSection = document.querySelector(".main-section")
            const allItems = document.querySelector(".items")
            allItems.classList.add("active")
            mainSection.classList.add("active")
            sendDetailsToDetailsSection(img.dataset.id)
            // console.log(img.dataset.id)
        })
    })
}



function addProductInLikedPage(productId) {
    let likedItem = db.collection("products").doc(productId)
    likedItem.get()
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



function displayProductAtHomePage(products) {
    // console.log(products[0])
    const apple = document.querySelector(".apple")
    const hp = document.querySelector(".hp")
    const asus = document.querySelector(".asus")
    products.forEach(product => {
        // console.log(product.id)
        let eachItem = document.createElement("div")
        eachItem.classList.add("each-item");
        if (product.brand == "apple") {
            // console.log(product.brand)
            eachItem.innerHTML =
                `
                <img src="${product.image}"
        alt="${product.name}" data-id="${product.id}" class="imageForDetails">
        <span>${product.name}</span>
        <span>$${product.price}</span>
        <span class="likedProduct"  data-id="${product.id}"><i class="fas fa-heart"></i>  </span>
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
                alt="${product.name}" data-id="${product.id}" class="imageForDetails">
    <span>${product.name}</span>
    <span>$${product.price}</span>
    <span class="likedProduct"  data-id="${product.id}"><i class="fas fa-heart"></i>  </span>    `
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
        alt="${product.name}" data-id="${product.id}" class="imageForDetails">
    <span>${product.name}</span>
    <span>$${product.price}</span>
    <span class="likedProduct" data-id="${product.id}"><i class="fas fa-heart"></i>  </span>        `
            let span = document.createElement("span")
            span.innerHTML = `<button title="add-to-cart">Add to cart</button>`
            span.addEventListener("click", () => {
                // console.log(product)
                addProductInCartSection(product)
            })
            eachItem.appendChild(span)
            asus.appendChild(eachItem)
        }
        getTheLocationOfAllImage()



        eachItem.addEventListener("click", () => {
            products.forEach(product => {
                db.collection("currentSelectedProduct").doc(`${product.id}`).delete()
            })

            let currentProduct = db.collection("currentSelectedProduct").doc(product.id)
            currentProduct.get()
                .then((doc) => {
                    if (doc.exists) {
                        currentProduct.delete()
                    } else {
                        currentProduct.set({
                            id: product.id,
                            quantity: 1,
                            ...product
                        })

                    }
                })

        })
    })
    getLikedProductFromFireStore()
    getLikedProduct()

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


getProductsFromFireStore()