let allBoldItems = []
let para = document.querySelector('p')
let bold = document.querySelectorAll('p strong')
function getBoldItems() {
    
    allBoldItems = Array.from(bold)
}
getBoldItems()
console.log(allBoldItems)

function highlight() {
    allBoldItems.forEach(b => {
        b.style.color = 'blue';
    });
}

function returnItemsToDefault() {
    
    
    allBoldItems.forEach(b => {
        b.style.color = '';
    });
}

para.addEventListener("mouseover", highlight)
para.addEventListener("mouseout", returnItemsToDefault)

