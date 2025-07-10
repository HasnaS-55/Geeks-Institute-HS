const numbers = [5,0,9,1,7,4,2,6,3,8];


console.log(numbers.toString())
console.log(`${numbers.join("/")}`)


let sortedNumbers = []
while (numbers.length > 0) {
    let maxIndex = 0;
    for (let i = 1; i < numbers.length; i++) {
        
        if (numbers[i] > numbers[maxIndex]) {
            maxIndex = i;
        }
    }
    sortedNumbers.push(numbers.splice(maxIndex, 1)[0]); 
}

console.log(sortedNumbers);
