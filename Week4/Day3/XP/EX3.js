const users = { 
    user1: 18273, 
    user2: 92833, 
    user3: 90315 
}

let array = []
let array2 = []
for (let [key, value] of Object.entries(users)) {
    array.push([key, value])
    array2.push([key, value * 2])
}
console.log(array)
console.log(array2)