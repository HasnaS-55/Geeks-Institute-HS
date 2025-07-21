// Exercise 3 : Resolve & Reject
const promise1 = () => {
    return new Promise((x, y) => {
      setTimeout(() => {
        x("success")
    }, 4000)
})
}

promise1()
   .then(result => console.log(result))
   .catch(error => console.log(error))
