const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];
const full = epic.reduce((sum, str) => sum.concat(` ${str}`))
console.log(full)