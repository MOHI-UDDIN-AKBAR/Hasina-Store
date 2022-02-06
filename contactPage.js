const form = document.querySelector("form")

const logo = document.querySelector("#logo")
// console.log(logo)
logo.addEventListener("click", () => {
    window.location.assign("index.html")
})

function sendMessage(name, email, message) {
    Email.send({
        SecureToken: "1d792475-f528-42be-a789-8caeffcbba9e",
        To: "mmaarafat80@gmail.com",
        From: document.getElementById("email").value,
        Subject: "New message",
        Body: `You got a message from ${name} <br/> from ${email} <br/>${message} `
    }).then(
        message => alert("Your message send successfully")
    );
}



form.addEventListener("submit", (e) => {
    e.preventDefault()
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const message = document.getElementById("textarea").value
    console.log(name, email, message)
    sendMessage(name, email, message)
})