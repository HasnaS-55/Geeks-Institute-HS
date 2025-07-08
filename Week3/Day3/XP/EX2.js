const form = document.querySelector('form')
console.log("form elements", form)

const fnameInput = document.getElementById('fname');
const lnameInput = document.getElementById('lname');
const submitButton = document.getElementById('submit');

const firstname = document.querySelector('input[name="firstname"]')
const lastname = document.querySelector('input[name="lastname"]')
console.log(firstname, lastname)


form.addEventListener('submit', (event) => {
    event.preventDefault()
    let fNamaV = firstname.value
    let lNamaV = lastname.value
    if (!fNamaV && !lNamaV) {
        alert("Please fill your fullname")
    }
    const answersList = document.querySelector('.usersAnswer');
    answersList.innerHTML = `
                <li>First Name: ${fNamaV}</li>
                <li>Last Name: ${lNamaV}</li>
                `
});


