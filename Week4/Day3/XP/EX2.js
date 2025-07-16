function displayStudentInfo(objUser){
    //destructuring
    const {first, last} = objUser
    console.log(`Your full name is ${first} ${last}`)
}

displayStudentInfo({first: 'Elie', last:'Schoppik'});
