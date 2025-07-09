// EX1
let numbers = [123, 8409, 100053, 333333333, 7]
for (let number of numbers) {
    let result = number % 3
    console.log(result === 0)
}


// EX2
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
}

let greeting = prompt("What is your name?")
for (let student in guestList) {
    

    if (student == greeting) {
        console.log(`Hi! ${student}, you are from ${guestList[student]}`)
    } else {
        console.log("Hi! I am a guest")
    }
}

// EX3
let age = [20,5,12,43,98,55];
let sum = 0
let max
for (let num of age) {
    sum += num
}

for (let i = 0; i <= age.length; i++) {
    
    if (age[i] < age [i-1]) {
        max = age[i-1]
    }
}

console.log(sum)
console.log(max)



