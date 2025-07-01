const people = ["Greg", "Mary", "Devon", "James"];
people.shift()
people[2] = "Jason"
people.push("Hasna")

console.log(people.indexOf("Mary"))
console.log(people.slice(1, 3))

console.log(people.indexOf("Foo")) //return -1 because there is no "Foo" in the array after checking and nothing finf indexOf() return -1
let last = people[people.length - 1]
console.log(last)

for (let x of people){
    console.log(`${x}`)
    if (x == "Devon") {
        break;
    }

}