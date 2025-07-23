// Daily challenge: Play with words
function makeAllCaps(arrOfWords) {
  return new Promise((resolve, reject) => {
    if (arrOfWords.every(word => typeof word === "string")) {
      const uppercased = arrOfWords.map(word => word.toUpperCase());
      resolve(uppercased);  
    } else {
      reject("Not all items are strings!");
    }
  });
}

function sortWords(uppercasedWords) {
  return new Promise((resolve, reject) => {
    if (uppercasedWords.length > 4) {
      const sorted = [...uppercasedWords].sort();  
      resolve(sorted);
    } else {
      reject("Array length is not greater than 4");
    }
  });
}


makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));



makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));



makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error));


const morse = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs(str) {
    return new Promise((resolve, reject) => {
        if (!str || str.trim() === "") {
            reject(new Error("Morse string is empty"));
        } else {
            try {
                const obj = JSON.parse(str);
                if (Object.keys(obj).length === 0) {
                    reject(new Error("Morse object is empty"));
                } else {
                    resolve(obj);
                }
            } catch (e) {
                reject(new Error("Invalid JSON string"));
            }
        }
    });
}

function toMorse(morseJS) {
    return new Promise((resolve, reject) => {
        const userInput = prompt("Enter a word/sentence:");
        if (!userInput) {
            reject(new Error("No input provided"));
            return;
        }

        const lowerInput = userInput.toLowerCase();
        const morseArray = [];
        
        for (const char of lowerInput) {
            if (!morseJS[char]) {
                reject(new Error(`Character '${char}' doesn't exist in Morse code`));
                return;
            }
            morseArray.push(morseJS[char]);
        }
        
        resolve(morseArray);
    });
}

function joinWords(morseTranslation) {
    const result = morseTranslation.join('\n');
    
    const outputDiv = document.createElement('div');
    outputDiv.textContent = result;
    outputDiv.style.whiteSpace = 'pre'; 
    document.body.appendChild(outputDiv);
    return result;
}

toJs(morse)
    .then((morseJS) => toMorse(morseJS))
    .then((morseTranslation) => joinWords(morseTranslation))
    .catch((error) => {
        console.error("Error:", error.message);
        alert(error.message); 
    });