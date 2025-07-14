const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];
const usernames = []
gameInfo.forEach((user) => usernames.push(user.username.concat("!")))
console.log(usernames)
const winners = []
gameInfo.forEach((user) => {if (user.score > 5){winners.push(user.username)}  })
console.log(winners)

const scores =[]
gameInfo.forEach((user) => scores.push(user.score))
const total = scores.reduce((sum, score) => score + sum, 0)
console.log(total)