import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './About.css'
const AboutUs = () => {
    const [text, setText] = useState('');
    const[pic, setPic] = useState([]);
    const [data, setData] = useState({ text: '', imageUrl: '' })
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const [feedback, setFeedback] = useState('');

const fetchData = () => {
    axios.get(`${import.meta.env.VITE_SERVER_HOSTNAME}/aboutUs`)
    .then(response => {
        const data = response.data
        console.log('response:', response.data)
        setData(data)
    })
    .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
}
  useEffect(() => {
    fetchData()
    const intervalHandle = setInterval(() => {
      fetchData()
    }, 5000)

    return e => {
      clearInterval(intervalHandle)
    }
  }, [])
return(
    <>
    <h1>About Me</h1>

    <div className="textbox">
        <p>About Me:</p>
        <p>{data.text}</p>
    </div>
    <div>
        <p>This is me!</p>
        <img className = 'photo' src={data.imageUrl}></img>
    </div>

    </>

)

}
export default AboutUs