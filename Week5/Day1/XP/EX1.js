// EX1: Comparison 
const compareToTen = (num) => {
    return new Promise((x, y) => {
       if (num <= 10) {
        x(`${num} is less than or equal to 10`)
       } else {
        y(`${num} is greater than 10`)
       }
    })

}


compareToTen(15)
  .then(result => console.log(result))
  .catch(error => console.log(error))

//In the example, the promise should resolve
compareToTen(8)
  .then(result => console.log(result))
  .catch(error => console.log(error))

