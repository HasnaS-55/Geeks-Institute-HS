import {person} from "./data.js"


function averageAge(arr) {
    
    const totalAge = arr.reduce((sum, item) => sum + item.age, 0)
    const average = totalAge / arr.length
    console.log(average)
}

averageAge(person)
