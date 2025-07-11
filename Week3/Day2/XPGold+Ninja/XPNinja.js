// EX1: Random Number

let num = Math.floor(Math.random() * 101);
for (let i = 0; i < num; i++) {
  if (i % 2 === 0) {
    console.log(i);
  }
}

// EX2: Capitalized Letters
function capitalize(str) {
  let even = "";
  let odd = "";
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0 || i === 0) {
      even += str[i].toUpperCase();
    } else {
      even += str[i].toLowerCase();
    }
  }
  for (let j = 0; j < str.length; j++) {
    if (j % 2 !== 0) {
      odd += str[j].toUpperCase();
    } else {
      odd += str[j].toLowerCase();
    }
  }
  return [even, odd];
}
console.log(capitalize("abcdef"));

// EX3: Palindrome
function isPalindrome(str) {
  let midIndex = Math.floor((str.length - 1) / 2);
  for (let i = 0; i < midIndex; i++) {
    if (str[midIndex - i] !== str[midIndex + i]) {
      return `${str} is not palindrome`;
    }
  }
  return `${str} is palindrome`;
}

console.log(isPalindrome("madam"));
console.log(isPalindrome("Hasna"));

// EX4: Biggest Number
function biggestNumberInArray(arrayNumber) {
  if (arrayNumber.length === 0) return undefined;

  let max = -Infinity;
  for (let num of arrayNumber) {
    if (typeof num === "number") {
      if (num > max) {
        max = num;
      }
    }
  }

  return max;
}
const array = [-1, 0, 3, 100, 99, 2, 91];
const array2 = ["a", 3, 4, 2];
console.log(biggestNumberInArray(array));
console.log(biggestNumberInArray(array2));

// EX5: Unique Elements
function unique(arr) {
  let newList = [];
  newList.push(arr[0])
  for (let i = 0; i < arr.length; i++) {
    if (!newList.includes(arr[i])) {
      newList.push(arr[i]);
    }
  }

  return newList;
}
console.log(unique([1, 2, 3, 3, 3, 3, 4, 5]));


// EX6: Calendar
function createCalendar(year, month) {
    
    const firstDay = new Date(year, month - 1, 1);
    const firstWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    
    
    const startDay = firstWeekday === 0 ? 6 : firstWeekday - 1;
    
    
    const table = document.createElement('table');
    
    
    const headerRow = document.createElement('tr');
    ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].forEach(day => {
        const th = document.createElement('th');
        th.textContent = day;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    
    
    let currentDay = 1;
    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');
        
        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            
            if (i === 0 && j < startDay) {
                cell.textContent = '';
            } else if (currentDay > daysInMonth) {
                cell.textContent = '';
            } else {
                cell.textContent = currentDay;
                currentDay++;
            }
            
            row.appendChild(cell);
        }
        
        table.appendChild(row);
        if (currentDay > daysInMonth) break;
    }
    
    return table;
}


