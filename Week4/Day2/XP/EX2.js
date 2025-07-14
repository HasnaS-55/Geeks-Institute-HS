// EX2: Colors#2
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];


const result = () => { colors.map((c, index) => index < 4 ? console.log(`${index + 1}${ordinal[index]} is ${c}`) : console.log("etc.."))};

result()
    



