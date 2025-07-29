import fs from 'fs/promises';
import path from 'path';

const __dirname = path.resolve();

async function readDirectory(directoryPath) {
    try {
       
        const absolutePath = path.join(__dirname, directoryPath);
        
        
        const files = await fs.readdir(absolutePath);
        
        
        console.log(`Files in ${directoryPath}:`);
        files.forEach(file => console.log(`- ${file}`));
        
        return files; 
    } catch (err) {
        console.error('Error reading directory:', err.message);
        throw err; 
    }
}


readDirectory('./')