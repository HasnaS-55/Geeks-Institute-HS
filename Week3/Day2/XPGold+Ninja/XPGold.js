// EX1: Is_Blank
function isBlank (str) {
    return !str || str.trim().length === 0
}
console.log(isBlank('')); 
console.log(isBlank('abc'));


//EX2: Abbrev_name
function abbrevName(str) {
    abb_name = ""
    let i = str.indexOf(" ")
    for (let j = 0; j <= i + 1; j++) {
        abb_name += str[j]
    }
    return abb_name
}

console.log(abbrevName("Robin Singh")); 

// EX3: SwapCase

function SwapCase(str) {
    let newStr = ""
    for (let i =0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase()) {
            newStr = newStr + str[i].toLowerCase()

        } else if (str[i] === str[i].toLowerCase()) {
            newStr = newStr + str[i].toUpperCase()
        }
    }
    return newStr
    
}
console.log(SwapCase('The Quick Brown Fox'))


// EX4: Omnipresent 
function isOmnipresent(arrays, omni) {
    for (let array of arrays) {
        for (let i = 0; i < array.length; i++) {
            return array[i] === omni
        }
    }
    return false
}
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1))
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 4]], 6));



