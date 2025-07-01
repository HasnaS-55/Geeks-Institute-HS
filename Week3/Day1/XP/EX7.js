const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"].sort();
let brand_name = "";

for (let name of names) {
    if (name.length > 0) {  
        brand_name += name[0];  
    }
}

console.log(brand_name);  
