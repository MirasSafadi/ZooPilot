import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';


function ConnectToDB(){
  axios.get('http://localhost:8000/api/connectToDB')
      .then(console.log('Connected to DB!'))
}
function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/api/home')
      .then(res => setState(res.data))
  }, [])

  const [state, setState] = useState('')
  
  return (
    <div className="App">
      <h1 style={{color: "white"}}>{state.response_text}</h1>
      <button className="btn btn-success" onClick={ConnectToDB}>Connect to DB</button>
    </div>
  );
}

export default App;
