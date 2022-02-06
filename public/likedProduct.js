const logo = document.querySelector("#logo")
// console.log(logo)
logo.addEventListener("click", () => {
    window.location.assign("index.html")
})


function cancelItemFromLikedProductList(productId) {
    db.collection("liked-products").doc(productId).delete()
}

function addProductInCartSection(productId) {
    let allProduct = db.collection("products").doc(productId)
    allProduct.get()
        .then((product) => {
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
                            ...product.data()
                        })
                    }
                })
        })
}


function clickedProductForCartSection() {
    const allProducts = document.querySelectorAll(".each-item .addToCart")
    allProducts.forEach(product => {
        product.addEventListener("click", () => {

            // console.log(product.dataset.id)
            addProductInCartSection(product.dataset.id)
        })
    })
}

function getLikedProductFromFireStore() {
    db.collection("liked-products").onSnapshot(snapshot => {
        let allLikedProductList = ""
        snapshot.forEach(doc => {
            // // console.log(doc.data().name)
            // let likedProduct = document.createElement("div")
            // likedProduct.classList.add("each-item")
            allLikedProductList += ` 
            <div class="each-item">
            <img src="${doc.data().image}"
            alt="${doc.data().name}">
            <span>${doc.data().name}</span>
            <span>$${doc.data().price}</span>
            <span class="addToCart" data-id="${doc.id}"><button title="add-to-cart">Add to cart</button></span>
            <span class="cancelFromLikedPage" data-id="${doc.id}"><i class="fas fa-times"></i></span>
            </div>
            `
        })

        const likedProductList = document.querySelector(".likedProductList .product-list")
        likedProductList.innerHTML = allLikedProductList
        getCancelProductFromLikedProductList()
        clickedProductForCartSection()
    })

}

function getCancelProductFromLikedProductList() {
    const cancelProducts = document.querySelectorAll(".each-item .cancelFromLikedPage")

    cancelProducts.forEach(cancelProduct => {
        cancelProduct.addEventListener("click", () => {
            console.log(cancelProduct.dataset.id)
            cancelItemFromLikedProductList(cancelProduct.dataset.id)

        })
    })

}

getLikedProductFromFireStore()