const navDiv = document.getElementById('navBar');
navDiv.setAttribute('id', 'socialNetworkNavigation')
const newLi = document.createElement('li')
newLi.innerHTML = '<a href="#">Logout</a>'

const line = document.querySelector('#socialNetworkNavigation ul')
line.appendChild(newLi)

console.log(line.firstElementChild.textContent)
console.log(line.lastElementChild.textContent)


