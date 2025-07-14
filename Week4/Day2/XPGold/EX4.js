const array = [[1],[2],[3],[[[4]]],[[[5]]]]
console.log(array.flat(2))

const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const y = greeting.map((greet) => greet.reduce((sum, item) => (sum + " " + item).trimStart(), "")).flat()

console.log(y)