function displayNumbersDivisible(divisor = 23) {
  let numbers = [];
  let sum = 0;
  
  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      numbers.push(i);
      sum += i;
    }
  }
  
  console.log(`Outcome: ${numbers.join(' ')}`);
  console.log(`Sum: ${sum}`);
}


displayNumbersDivisible();


displayNumbersDivisible(3);
displayNumbersDivisible(45);