//EX1 Checking the BMI

const person1 = {
  FullName: "John Doe",
  Mass: 75,
  Height: 1.75,
  BMI: function () {
    return (this.Mass / Math.pow(this.Height, 2)).toFixed(2);
  },
};

const person2 = {
  FullName: "Jane Smith",
  Mass: 62,
  Height: 1.68,
  BMI: function () {
    return (this.Mass / Math.pow(this.Height, 2)).toFixed(2);
  },
};

function compare() {
  if (person1.BMI() > person2.BMI()) {
    console.log(`${person1["FullName"]} has the largest BIM: ${person1.BMI()}`);
  } else {
    console.log(`${person2["FullName"]} has the largest BIM: ${person2.BMI()}`);
  }
}
console.log(person1.BMI());
compare();

// EX2 Grade Average
let grades = [100, 80, 54, 21, 41, 86, 90];
let sum = 0;
function findAVG(gradesList) {
  for (let grade of gradesList) {
    sum += grade;
  }
  findResult(gradesList);
}
function findResult(gradesList) {
  let avg = (sum / gradesList.length).toFixed(2);
  console.log(`Grades average is ${avg}`);

  if (avg > 65) {
    console.log("Congrats! You passed");
  } else {
    console.log("You fail repeat the exames");
  }
}

findAVG(grades);
