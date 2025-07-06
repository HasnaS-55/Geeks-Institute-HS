
const divElement = document.getElementById('container');
console.log('Div element:', divElement);
console.log('Div content:', divElement.textContent);


const listItems = document.querySelectorAll('.list li'); 
console.log(listItems)

for (let item of listItems) {
  if (item.textContent === 'Pete') {
    item.textContent = 'Richard'; 
    item.style.border = '1px solid lightblue'
    
  } else if (item.textContent === 'Sarah'){
    item.remove()
  } else if (item.textContent === "Dan") {
    item.style.display = 'none'
  }
  
  
}

const allItems = document.querySelectorAll('.list')
for (let list of allItems) {
    const firstItem = list.querySelector('li:first-child')
    firstItem.textContent = "Hasna"
}

allItems.forEach(list => {
    list.classList.add('student_list')
})

allItems[0].classList.add('university', 'attendance')

let bac = document.querySelector('div')
bac.style.backgroundColor = 'lightblue'
bac.style.padding = '20px'
document.body.style.fontSize = "22px"



const visibleUsers = Array.from(document.querySelectorAll('.list li'))
  .filter(item => item.style.display !== 'none')
  .map(item => item.textContent)
   

if (divElement.style.backgroundColor === 'lightblue' && visibleUsers.length >= 2) {
  alert(`Hello ${visibleUsers[0]} and ${visibleUsers[1]}!`);
}
