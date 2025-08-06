import react, {Component} from 'react'

class UserFavoriteAnimals extends Component {
    render() {
        const {animals} = this.props
        console.log(this.props)
        return(
            <ul>
               {animals.map((animal, index) => <li key={index}>{animal}</li>)}
            </ul>
        )
    }
}

export default UserFavoriteAnimals