const logOut = document.getElementById("signOut")
const userEmail = document.querySelector(".userEmail")
const goLoginPage = document.getElementById("goLoginPage")

const auth = firebase.auth()


logOut.classList.add("active")


const logo = document.querySelector("#logo")
// console.log(logo)
logo.addEventListener("click", () => {
    window.location.assign("index.html")
})

goLoginPage.addEventListener("click", () => [
    window.location.replace("accountPage.html")
])
const logOutFunction = () => {
    auth.signOut()
        .then(() => {
            console.log("you are out")
            window.location.assign("accountPage.html")
        })
        .catch((e) => {
            console.log(e)
        })
}

auth.onAuthStateChanged(user => {
    console.log(user)
    if (user) {
        userEmail.innerHTML = user.email
        logOut.classList.remove("active")
        goLoginPage.classList.add("active")
    }


})





logOut.addEventListener("click", () => {

    logOutFunction()

})