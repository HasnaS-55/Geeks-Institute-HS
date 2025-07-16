//[2] === [2] //false
//{} === {}//false
// both saved in diffrenet memory so false
const object1 = { number: 5 }; 
const object2 = object1; 
const object3 = object2; 
const object4 = { number: 5};

object1.number = 4;
console.log(object2.number)
console.log(object3.number)
console.log(object4.number)

class Animal {
    constructor(name, type, color) {
        this.name = name
        this.type = type
        this.color = color
    }
}
class Mammal extends Animal {
    constructor(name, type, color) {
        super(name, type, color)
        
    }

    sound(sound) {
        return `${sound} I am a ${this.type}, named ${this.name} and I am ${this.color}`
    }
}

const farmerCow = new Mammal("Lily", "cow", "brown and white")
console.log(farmerCow.sound("Moooo"))