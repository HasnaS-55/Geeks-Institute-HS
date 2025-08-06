import react, {Component} from 'react'
import '../Exercise.css'

class Exercise extends Component {
    render()  {
        return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px'}}>
            <h1 style={ style_header}>This is a Header</h1>
            <p  className='para'>This is a sample paragraph in React.</p>
            <a href='https://reactjs.org'>Visit React</a>

            <form style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px'}}>
                <label>
                    Name:
                </label>
                <input type='text' name='name'/>
                <button type='submit'>Submit</button>
            </form>

            <img src='%PUBLIC_URL%/logo192.png' alt='react' style={{width: '150px', height: '150px'}}/>
            <ul>
          <li>First item</li>
          <li>Second item</li>
          <li>Third item</li>
        </ul>
        </div>
        )
    }

        
}

const style_header = {
  color: "white",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial"
};

export default Exercise