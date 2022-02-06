const subscribe = document.getElementById("subscribe")
const menuBar = document.getElementById("bar")
const navigationMenu = document.querySelector(".navigationMenu")
const navigation = document.querySelector(".navigation")
const afterHeading = document.querySelector(".after-heading")
const searchItem = document.querySelector(".search-item")
const searchForItems = document.querySelector("#search-items")
const searchForItems2 = document.querySelector("#search-items2")
const homeNav = document.getElementById("home")
const productNav = document.getElementById("productNav")
const contactNav = document.getElementById("contactNav")
const likedProductQuantityForIcon = document.getElementById("likedProductQuantityForIcon")

let count = 0;
navigationMenu.style.display = "none"
// afterHeading.style.display = "none"
afterHeading.classList.add("active")


if (window.screen.width <= 850) {
    navigation.style.display = "none"
    searchItem.style.display = "none"
    afterHeading.style.display = "flex"
    afterHeading.classList.remove("active")


}

function showingMenu() {
    bar.addEventListener("click", () => {
        if (count == 0) {
            count--
            navigationMenu.style.display = "flex"
        } else {
            count++
            navigationMenu.style.display = "none"
        }
    })
}
showingMenu()
const useColorForSubscribeButton = () => {
    let getColor = JSON.parse(localStorage.getItem("color"))
    // console.log(getColor)
    if (getColor) {
        subscribe.style.backgroundColor = getColor
    }
}

useColorForSubscribeButton()
subscribe.addEventListener("click", () => {
    const email = document.getElementById("email").value
    color = "#523b38"
    if (email) {
        subscribe.style.backgroundColor = color
        localStorage.setItem("color", JSON.stringify(color))
    }

})

function sendTotalQuantity(totalQuantity) {
    const quantity = document.getElementById("quantity")
    quantity.innerText = totalQuantity

}


function getTotalQuantity() {
    db.collection("cart-items").onSnapshot(snapshot => {
        let totalQuantity = 0
        snapshot.forEach(doc => {
            totalQuantity += doc.data().quantity
        })
        // console.log(totalQuantity)
        sendTotalQuantity(totalQuantity)
    })
}


window.addEventListener('click', (e) => {
    if (!afterHeading.contains(e.target)) {
        navigationMenu.style.display = "none"
    }
});
// db.collection("products").get().then((querySnapshot) => {
//     let products = []
//     querySnapshot.forEach((doc) => {
//         // console.log(`${doc.id} => ${doc.data().brand}`);
//         products.push({
//             id: doc.id,
//             ...doc.data(),
//         })
//     });
// console.log(products)
const searchForItemsFromFirebase = (searchItemText) => {
    console.log(searchItemText)
    db.collection("products").get().then(querySnapshot => {
        let storeDataOfSearchItem = []
        querySnapshot.forEach(doc => {
            // console.log(doc.data().brand)
            let brand = doc.data().brand
            let text = doc.data().name
            let lowerCase1 = searchItemText.toLowerCase()
            let lowerCase2 = searchItemText.toLowerCase()
            console.log(lowerCase1)
            if (brand.includes(searchItemText) || text.includes(searchItemText) || brand.includes(lowerCase1) || text.includes(lowerCase2)) {

                storeDataOfSearchItem.push({
                    id: doc.id,
                    ...doc.data(),
                })
            }
        })
        console.log(storeDataOfSearchItem)

        localStorage.setItem("SearchData", JSON.stringify(storeDataOfSearchItem))
        if (storeDataOfSearchItem[0] == undefined) {
            let text = "SORRY, WE COULD NOT FIND YOUR PRODUCT. TRY AGAIN"
            localStorage.setItem("message", JSON.stringify(text))
        }
        window.location.assign("searchProductPage.html")
    })
}

searchForItems.addEventListener("change", () => {

    searchForItemsFromFirebase(searchForItems.value)
})
searchForItems2.addEventListener("change", () => {

    searchForItemsFromFirebase(searchForItems2.value)
    // console.log(searchForItems2.value)
})

getTotalQuantity()

console.log(window.screen.width)

function SpecifyLocation() {
    if (window.location.pathname == "/index.html") {
        homeNav.classList.add("specify")
    } else if (window.location.pathname == "/productPage.html") {
        productNav.classList.add("specify")
    } else if (window.location.pathname == "/contactPage.html") {
        contactNav.classList.add("specify")
    }
}
SpecifyLocation()
const sendTotalQuantityForLikedProduct = (totalQuantity) => {
    likedProductQuantityForIcon.innerText = totalQuantity
}

function getTotalQuantityOfLikedProduct() {
    db.collection("liked-products").onSnapshot(snapshot => {
        let totalQuantity = 0
        snapshot.forEach(doc => {
            totalQuantity += 1
        })
        // console.log(totalQuantity)
        // sendTotalQuantityForLikedProduct(totalQuantity)
        console.log(totalQuantity)
        sendTotalQuantityForLikedProduct(totalQuantity)
    })
}
getTotalQuantityOfLikedProduct()
console.log(window.location.pathname)