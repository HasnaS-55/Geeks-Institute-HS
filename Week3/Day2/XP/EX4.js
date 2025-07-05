function hotelCost() {
    let numberOfNight 
    while (true) {
        let numberOfNight = prompt("How many night you are going to stay?");
        if (numberOfNight !== null) {
            return confirm(`Your totale is ${numberOfNight * 140}`) ;
        } 
    }
    
}




function playRideCost() {
    let destination 
    while (true) {
        let destination = prompt("Where are you going? Enter a number")
        if (typeof(destination) === 'string'){
            switch(destination.toLowerCase()){
               case "paris": return confirm("The cost of the ride is 220$");
               case "london": return confirm("The cost of the ride is 183$"); 
               default: return confirm("The cost of the ride is 300$");
            }
        }
    }

}


function rentalCarCost() {
    let rentalCar
    while (true){
        rentalCar = prompt("How many days are going to rent the car?")
        if (rentalCar <= 10) return confirm(`the total is ${rentalCar * 40}$`);
        else return confirm(`the total is ${(rentalCar * 40 * 50) / 100}$`);

    }
}




function totalVacationCost() {
    console.log(`The hotel cose is ${hotelCost()}, the plane cost ${playRideCost()} and rent car cost is ${rentalCarCost()}`)
}

totalVacationCost()