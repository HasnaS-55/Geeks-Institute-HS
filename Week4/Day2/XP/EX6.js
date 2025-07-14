const students = [{name: "Ray", course: "Computer Science", isPassed: true}, 
               {name: "Liam", course: "Computer Science", isPassed: false}, 
               {name: "Jenner", course: "Information Technology", isPassed: true}, 
               {name: "Marco", course: "Robotics", isPassed: true}, 
               {name: "Kimberly", course: "Artificial Intelligence", isPassed: false}, 
               {name: "Jamie", course: "Big Data", isPassed: false}];


const pass = students.filter(student => student.isPassed == true)
console.log(pass)
pass.forEach((studen) => {console.log(`Good job ${studen["name"]}, you passed the course in ${studen["course"]}`)})
