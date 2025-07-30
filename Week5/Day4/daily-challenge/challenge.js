const greeting = require('./greeting.js')
const colorTerminal = require('./colorful-message.js')
const readFile = require("./files/read-file.js")


console.log(greeting.greet("Fadwa"))
colorTerminal()
readFile("file-data.txt")