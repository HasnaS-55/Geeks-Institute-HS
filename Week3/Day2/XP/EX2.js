const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 

let shoppingList = ["banana", "orange", "apple"]
function myBill() {
    let price = 0
    for (let item of shoppingList){
        for (let available in stock) {
            if (item === available) {
                for (let price in prices) {
                    if (item === price) {
                        price += prices[price]
                        return stock[available] - 1 
                    }
                }
            }
        }
    } 
}


console.log(myBill())