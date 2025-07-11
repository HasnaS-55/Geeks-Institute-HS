function funcOne() {
  let a = 5;
  if (a > 1) {
    a = 3;
  }
  alert(`inside the funcOne function ${a}`);
}

// Prediction for #1.1:
// Output will be "inside the funcOne function 3" because:
// 1. a is initialized as 5
// 2. The if condition is true (5 > 1)
// 3. a is reassigned to 3

// #1.2 with const:
// Would throw an error because:
// const cannot be reassigned after declaration
// The line "a = 3" would fail

let a = 0;
function funcTwo() {
  a = 5;
}

function funcThree() {
  alert(`inside the funcThree function ${a}`);
}

// Prediction for #2.1:
// First funcThree(): "inside the funcThree function 0" (global a is 0)
// Then funcTwo() changes global a to 5
// Second funcThree(): "inside the funcThree function 5" (global a was changed)

// #2.2 with const:
// Would throw an error because:
// const cannot be reassigned after declaration
// The line "a = 5" in funcTwo would fail

function funcFour() {
  window.a = "hello";
}

function funcFive() {
  alert(`inside the funcFive function ${a}`);
}

// Prediction for #3.1:
// funcFour() sets window.a = "hello" (global variable)
// funcFive(): "inside the funcFive function hello"
// Works because window.a becomes a global property

let a = 1;
function funcSix() {
  let a = "test";
  alert(`inside the funcSix function ${a}`);
}

// Prediction for #4.1:
// Output will be "inside the funcSix function test" because:
// The local a shadows the global a inside the function

// #4.2 with const:
// Same behavior as with let in this case
// Both declarations would work fine because:
// The const declaration is in a different scope

let a = 2;
if (true) {
  let a = 5;
  alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// Prediction for #5.1:
// First alert: "in the if block 5" (block-scoped a)
// Second alert: "outside of the if block 2" (original a)

// #5.2 with const:
// Same behavior as with let in this case
// The block-scoped const doesn't affect the outer variable

// EX2: Ternary Operator

const winBattle = () => true;
let experiencePoints = winBattle() ? 10 : 1;
console.log(experiencePoints);

// EX3: Is It a string?
let isString = (str) => (typeof str === "string" ? true : false);
console.log(isString("hello"));

console.log(isString([1, 2, 4, 0]));

// EX4: Find the Sum
let sum = (a, b) => a + b;
console.log(sum(5, 9))
  // EX5: Kg and Gram
(function kgToGrams(a) {
    console.log(`${a * 1000}`);
  }
)(5);

let weight = (function weightKg(a) {
  console.log(`${a * 1000}`);
})(6);
// Function declarations are hoisted and can be called before they're defined; expressions are not hoisted.
let convert = (a) => a * 1000;
console.log(convert(6))
  // EX6: Fortune teller
(function teller(nChildren, pName, location, job) {
    let text = document.createElement("div");
    let t = `You will be a ${job} in ${location}, and married to ${pName} with ${nChildren} kids." `;
    text.textContent = t;
    document.body.appendChild(text);
  }
)(
  3,
  "Lamya",
  "Tan",
  "Manager"
)
  // EX7: Welcome
(function welcome(username) {
    let profileDiv = document.getElementById("user-profile");
    let welcome = document.createElement("span");
    welcome.textContent = `Welcome back ${username}`;
    profileDiv.appendChild(welcome);

    let pic = document.createElement("img");
    pic.src = `https://ui-avatars.com/api/?name=${username}&background=random&rounded=true`;
    pic.classList.add("profile-pic");
    profileDiv.appendChild(pic);
  }
)("John");

// EX8: Juice Bar
// Part1
function makeJuice(size, a, b, c) {
  function addIngredients(ing1, ing2, ing3) {
    let p = document.createElement("div");
    p.textContent = `The client wants a ${size} juice, containing ${ing1}, ${ing2}, ${ing3}`;
    document.body.appendChild(p);
  }
  addIngredients(a, b, c);
}
makeJuice("Medium", "orange", "Banana", "Kiwi");

// Part2
function makeJuice(size, a, b, c, d, e, f) {
  let ingredients = [];

  function addIngredients(ing1, ing2, ing3) {
    ingredients.push(ing1, ing2, ing3);
  }

  function displayJuice() {
    let p = document.createElement("div");
    p.textContent = `The client wants a ${size} juice, containing ${ingredients.join(
      ", "
    )}`;
    document.body.appendChild(p);
  }

  addIngredients("orange", "Banana", "Kiwi");
  addIngredients("Strawberry", "Mango", "Pineapple");
  displayJuice();
}
makeJuice("Medium");
