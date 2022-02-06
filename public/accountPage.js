const form = document.querySelector(" .signup form")
const form2 = document.querySelector(" .login form")

const username = document.getElementById("name")
const email = document.getElementById("email1")
const email2 = document.getElementById("email2")
const password = document.getElementById("password1")
const password2 = document.getElementById("password2")
const password3 = document.getElementById("password3")

const logo = document.querySelector("#logo")
// console.log(logo)
logo.addEventListener("click", () => {
    window.location.assign("index.html")
})

function checkBasicRulesForLogin() {
    const email2Value = email2.value
    const password3Value = password3.value
    if (email2Value === "") {
        setError(email2, "email is empty")
    } else if (!isEmail(email2Value)) {
        setError(email2, "email is not valid")
    } else {
        setSuccess(email2)
    }
    if (password3Value === "") {
        setError(password3, "password is empty")
    } else {
        setSuccess(password3)
    }

}

function checkBasicRules() {
    const usernameValue = username.value
    const emailValue = email.value
    // const email2Value = email2.value
    // const password3Value = password3.value

    const passwordValue = password.value
    const password2Value = password2.value

    if (usernameValue === "") {
        setError(username, "username is empty")
    } else {
        setSuccess(username)
    }
    if (emailValue === "") {
        setError(email, "email is empty")
    } else if (!isEmail(emailValue)) {
        setError(email, "email is not valid")
    } else {
        setSuccess(email)
    }
    // if (email2Value === "") {
    //     setError(email2, "email is empty")
    // } else if (!isEmail(email2Value)) {
    //     setError(email2, "email is not valid")
    // } else {
    //     setSuccess(email2)
    // }
    if (passwordValue === "") {
        setError(password, "password is empty")
    } else {
        setSuccess(password)
    }
    // if (password3Value === "") {
    //     setError(password3, "password is empty")
    // } else {
    //     setSuccess(password3)
    // }
    if (password2Value === "") {
        setError(password2, "password two is empty")
    } else if (passwordValue !== password2Value) {
        setError(password2, "passwords does not match")
    } else {
        setSuccess(password2)
    }
}
form2.addEventListener("submit", (e) => {
    e.preventDefault()
    // checkBasicRules()
    checkBasicRulesForLogin()
})
form.addEventListener('submit', (e) => {
    e.preventDefault()
    checkBasicRules()
})

function setError(input, errorText) {
    const formTools = input.parentElement;
    const small = formTools.querySelector("small")
    small.innerHTML = errorText
    formTools.className = "form-tools error"
}

function setSuccess(input) {
    const formTools = input.parentElement;
    formTools.className = "form-tools success"
}

function isEmail(emailValue) {

    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(emailValue);
}