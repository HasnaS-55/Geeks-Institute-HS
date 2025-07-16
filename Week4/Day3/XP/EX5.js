class Dog {
  constructor(name) {
    this.name = name;
  }
};
// thsi one is right to extends from Dog class 
class Labrador extends Dog {
  constructor(name, size) {
    super(name);
    this.size = size;
  }
};
