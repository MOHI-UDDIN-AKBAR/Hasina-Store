const logo = document.querySelector("#logo")
// console.log(logo)
logo.addEventListener("click", () => {
    window.location.assign("index.html")
})


function decreaseProductQuantity(product) {
    // console.log(product)
    let cartItem = db.collection("cart-items").doc(product)
    cartItem.get()
        .then(doc => {
            if (doc.exists) {
                if (doc.data().quantity > 1) {
                    cartItem.update({
                        quantity: doc.data().quantity - 1
                    })
                }

            }
        })
}

function increaseProductQuantity(product) {
    let cartItem = db.collection("cart-items").doc(product)
    cartItem.get()
        .then(doc => {
            if (doc.exists) {
                if (doc.data().quantity > 0) {
                    cartItem.update({
                        quantity: doc.data().quantity + 1
                    })
                }
            }
        })
}

function cancelProduct(product) {
    db.collection("cart-items").doc(product).delete()
}

function sendTotalCost(totalCost) {
    const totalAmount = document.querySelector(".totalAmount")
    const checkoutAmount = document.querySelector(".totat-checkout")
    totalAmount.innerText = `$${totalCost}`
    checkoutAmount.innerHTML = `$${totalCost}`

}


function countTotalCost() {
    db.collection("cart-items").onSnapshot(snapshot => {
        let totalCost = 0
        snapshot.forEach(doc => {
            totalCost += doc.data().quantity * doc.data().price
        })
        console.log(totalCost)
        sendTotalCost(totalCost)

    })
}
countTotalCost()





function getAllProductFromCartCollection() {
    const allCartProduct = document.querySelector(".all-cart-product")
    db.collection("cart-items").onSnapshot((snapshot) => {
        let cartProduct = ""
        snapshot.forEach((doc) => {
            // console.log(doc.id)
            // console.log(doc.id)
            cartProduct +=
                `
                <div class="cart-product">
                <div class="product">
                <img src="${doc.data().image}"
                    alt="${doc.data().name}" />
                <h3>${doc.data().name}</h3>
            </div>
            <div class="quantity-of-product">
                <span class="decrease" data-id="${doc.id}">
                    <i class="fas fa-chevron-left"></i>
                </span>
                <span>${doc.data().quantity}</span>
                <span class="increase" data-id="${doc.id}">
                    <i class="fas fa-chevron-right"></i>
                </span>

            </div>
            <div class="cost">
                <h3>$${(doc.data().quantity)*(doc.data().price)}</h3>
            </div>
            <div class="cancel" data-id="${doc.id}">
                <i class="fas fa-times"></i>
            </div>
            </div>
            `

        });
        allCartProduct.innerHTML = cartProduct
        takeCareOfButtonInCartItemArea()

    });
}

function takeCareOfButtonInCartItemArea() {
    const decrease = document.querySelectorAll(".decrease")
    const increase = document.querySelectorAll(".increase")
    const cancel = document.querySelectorAll(".cancel")
    // console.log(decrease, increase, cancel)
    decrease.forEach(button => {
        button.addEventListener("click", () => {
            console.log(button)

            decreaseProductQuantity(button.dataset.id)
        })
    })
    increase.forEach(button => {
        button.addEventListener("click", () => {

            increaseProductQuantity(button.dataset.id)
        })
    })
    cancel.forEach(button => {
        button.addEventListener("click", () => {

            cancelProduct(button.dataset.id)
        })
    })
}





















getAllProductFromCartCollection()