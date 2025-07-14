// EX1: Colors
const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
function Display() {
    colors.map((color, index) => {
        console.log(`${index + 1}# choice is ${color}`)
    })
}
Display()

const check = () => {colors.some(x => x === "Violet") ? console.log("Yeah"): console.log("No...")};
check()



