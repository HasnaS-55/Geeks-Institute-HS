const array = [NaN, 0, 15, false, -22, '',undefined, 47, null]
function removeArr(arr) {
    return arr.filter(item => typeof item === 'number' && !isNaN(item) && item !== 0) 
}

console.log(removeArr(array))