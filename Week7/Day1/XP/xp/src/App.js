import './App.css';
import UserFavoriteAnimals from './components/UserFavoriteAnimals.js'
import Exercise from './components/Exercise3.js'

const user = {
  firstName: 'Bob',
  lastName: 'Dylan',
  favAnimals : ['Horse','Turtle','Elephant','Monkey']
};



export function EX1() {
  const element = <h1>I Love JSX!</h1>
  const sum = 5 + 5
  return (
    <div className='EX'>
      <h1>Exercice 1</h1>
      <p>Hello World!</p>
      {element}
      <p>React is {sum} times better with JSX</p>
    </div>

  );
}


export function EX2() {
  return (
    <div className='EX'>
    <h3>{user.firstName}</h3>
    <h3>{user.lastName}</h3>
    <div>
      <UserFavoriteAnimals animals={user.favAnimals}/>
    </div>
    </div>
  )
}


export function EX3() {
  return (
    <div className="EX">
      <Exercise />
    </div>
  );

}




