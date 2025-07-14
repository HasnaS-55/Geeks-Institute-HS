// ------1------
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);
// output //['bread', "apple", "orange", 'chicken', "carrot", "potato"]

// ------2------
const country = "USA";
console.log([...country]);
// output["U", "S", "A"]
// ------Bonus------
let newArray = [...[,,]];
console.log(newArray);
// output [undefined, undefined]

