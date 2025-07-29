import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

export const writeFile = (fileName, content) => {
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`File ${fileName} written successfully.`);
};


export const readFile = (fileName) => {
    const filePath = path.join(__dirname, fileName);
    if (!fs.existsSync(filePath)) {
        console.error(`File ${fileName} does not exist.`)
        return null;
    }
    const content = fs.readFileSync(filePath, 'utf8')
    console.log(`File ${fileName} read successfully.`)
    return content;
};