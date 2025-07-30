const fs = require("fs");
const path = require("path");

function readFile(filePath) {
  const targetFile = path.join(__dirname, filePath);
  if (!fs.existsSync(targetFile)) {
    console.log("File does NOT exist at:", targetFile);
  }

  const readContent = fs.readFileSync(targetFile, 'utf-8')
  console.log(readContent)
}

module.exports = readFile
