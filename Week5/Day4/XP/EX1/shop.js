const products = require("./products.js")



function search_product(name) {
    let found_products = []
    const searchTerm = name.toLowerCase()
    for (let item of products) {
        if (item.name.toLowerCase().includes(searchTerm)) {
            console.log(item)
            found_products.push(item);
        }
        
    }
    if (found_products.length === 0) {
        console.log("No product was found matched the name given")
    }
}



search_product("Levi's 501 Jean")
search_product("Nike Air Maxx")