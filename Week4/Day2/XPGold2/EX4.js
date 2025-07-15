function repeat(str, n){
    let newStr = ""
    for (let i = 1; i <= n; i++) {
        newStr = newStr.concat(str)
    }
    return newStr
}

console.log(repeat('Ha!',3));