function changeEnough(itemPrice, amountOfChange){
    
    
    for (let i = 0; i < amountOfChange.length; i++) {
            if (i === 0) amountOfChange[i] *= 0.25; 
            else if (i === 1) amountOfChange[i] *= 0.10; 
            else if (i === 2) amountOfChange[i] *= 0.05;
            else if (i === 3) amountOfChange[i] *= 0.01; 
    }
    const pocket = amountOfChange.reduce((acc, change) => acc + change, 0)
    console.log(pocket)
    if (itemPrice <= pocket) {
        return true
    } else {
        return false
    }
}


console.log(changeEnough(4.25, [25, 20, 5, 0]))
console.log(changeEnough(14.11, [2,100,0,0]))
console.log(changeEnough(0.75, [0,0,20,5]) )