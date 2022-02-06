const signup = document.getElementById("signup")
const signupSection = document.querySelector(".signup")
const signup2 = document.getElementById("signup2")
const login = document.getElementById("login")
const loginSection = document.querySelector(".login")
const afterLoginSection = document.querySelector(".afterLogin")
const logOut = document.getElementById("signOut")
const Username = document.getElementById("name")
const email1 = document.getElementById("email1")
const passwordOne = document.getElementById("password1")
const passwordTwo = document.getElementById("password2")
const form1 = document.getElementById("form")
const emailTwo = document.getElementById("email2")
const passwordThree = document.getElementById("password3")


const auth = firebase.auth()

const Logo = document.querySelector("#logo")
// console.log(logo)
Logo.addEventListener("click", () => {
    window.location.assign("index.html")
})


auth.onAuthStateChanged(user => {
    // if (user) {

    // }
    // console.log(user)
})

function signUpFunction() {
    email1Value = email1.value
    passwordOneValue = passwordOne.value
    passwordTwoValue = passwordTwo.value
    // console.log(email1Value, passwordOneValue, passwordTwoValue)
    if (passwordOneValue === passwordTwoValue) {
        auth.createUserWithEmailAndPassword(email1Value, passwordOneValue)
            .then(() => {
                // console.log("success")
                // window.location.assign("index.html")
                // window.location.reload()
                emailVerificationFunction()

                // window.location.reload()
            }).catch((e) => {
                signupSection.classList.remove("active")
                console.log(e)
            })
    }
}


const loginFunction = () => {
    emailTwoValue = emailTwo.value
    passwordThreeValue = passwordThree.value
    // console.log(emailTwoValue, passwordThreeValue)
    auth.signInWithEmailAndPassword(emailTwoValue, passwordThreeValue)
        .then(() => {
            // userEmail.innerHTML = emailTwoValue
            // console.log("you are in")
            // afterLoginSection.classList.remove("active")
            // loginSection.classList.add("active")
            window.location.replace("afterLoginPage.html")
            // console.log("succsess")

        }).catch((e) => {
            console.log(e)
        })
}




function emailVerificationFunction() {
    auth.currentUser.sendEmailVerification()
        .then(() => {
            window.location.assign("index.html")
        })
        .catch((e) => {
            console.log(e)
        })
}



signup2.addEventListener("click", () => {
    signupSection.classList.remove("active")
    loginSection.classList.add("active")

})

signup.addEventListener("click", (e) => {
    e.preventDefault()
    signupSection.classList.add("active")
    signUpFunction()

    localStorage.removeItem("color")
    let getColor1 = JSON.parse(localStorage.getItem("color"))

    console.log(getColor1)

})
// logOut.addEventListener("click", () => {
//     // loginSection.classList.remove("active")
//     logOutFunction()
//     window.location.reload()
//     // 
// })
login.addEventListener("click", loginFunction)