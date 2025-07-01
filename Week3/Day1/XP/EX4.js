const building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent:  {
        sarah: [3, 990],
        dan:  [4, 1000],
        david: [1, 500],
    },
}

console.log(` In the building there are ${building.numberOfFloors}Floors`)
console.log(` In 1st floor ${building.numberOfAptByFloor.firstFloor} apts`)
console.log(` In 1st floor ${building.numberOfAptByFloor.thirdFloor} apts`)

console.log(`${building.nameOfTenants[1]} has ${building.numberOfRoomsAndRent.dan[0]} in his apt`)
if ((building.numberOfRoomsAndRent.sarah[1] + building.numberOfRoomsAndRent.david[1]) > building.numberOfRoomsAndRent.dan[1]) {
    building.numberOfRoomsAndRent.dan[1] = 1200
}
console.log(building.numberOfRoomsAndRent.dan[1])