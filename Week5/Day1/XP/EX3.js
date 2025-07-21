// Exercise 3 : Resolve & Reject
let promise1 = Promise.resolve(3)
let promise2 = Promise.reject("Boo!")

promise1
   .then(value => {
    console.log("Resolved with value:", value)
   })

promise2
   .catch(error => {
      console.log("Rejected with error:", error)
   })