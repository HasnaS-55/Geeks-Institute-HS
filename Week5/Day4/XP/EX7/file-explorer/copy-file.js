import fs from 'fs/promises'
import path from 'path'
const __dirname = path.resolve()

async function file(read, write) {
    try {
        const readPath = path.join(__dirname, read);
        const writePath = path.join(__dirname, write);
        const content = await fs.readFile(readPath, 'utf-8')
        const writing = await fs.writeFile(writePath, content, 'utf-8')
        console.log(`File copied successfully from ${read} to ${write}`)
    } catch(err) {
        console.log(err.message)
    }
}

file('source.txt', 'destination.txt')

