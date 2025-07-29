import _ from 'lodash'
import { addition, multiple } from './math.js'


console.log(addition(6, 9))
console.log(multiple(8, 9))

const numbers = [1, 2, 3, 4, 5]
const sumAll = _.sum(numbers)
console.log(sumAll)