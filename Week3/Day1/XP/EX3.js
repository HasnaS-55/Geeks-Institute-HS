let num = prompt("Enter a number:")
console.log(typeof(num))
let number = parseInt(num)

while (number < 10) {
    num = prompt("Entre an other number")
    number = parseInt(num)
}