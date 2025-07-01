let colors = ["blue", "red", "yellow", "white"]

for (let i in colors) {
    
    console.log(`My #${parseInt(i) + 1} choice is ${colors[i]}`)

}

let prefix = ["1st choice", "2nd choice", "3th choice", "4th choice"]
for (let i = 0; i < prefix.length; i++){
    console.log(`My ${prefix[i]} is color ${colors[i]}`)
}