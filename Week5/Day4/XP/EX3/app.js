import {writeFile, readFile} from './fileManager.js';

const fileNameToRead = 'Hello World.txt';
const fileNameToWrite = 'Bye World.txt';
const contentToWrite = 'Writing to the file';

const content = readFile(fileNameToRead);
writeFile(fileNameToWrite, contentToWrite)


if (content !== null) {
    console.log(`Content of ${fileNameToRead}: ${content}`);
    writeFile(fileNameToWrite, contentToWrite);
    console.log(`Content written to ${fileNameToWrite}: ${contentToWrite}`);
}