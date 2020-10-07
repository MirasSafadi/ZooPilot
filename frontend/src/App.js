import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';



function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/api/hello')
      .then(res => setState(res.data))
  }, [])

  const [state, setState] = useState('')
  
  return (
    <div className="App">
      <h1 style={{color: "white"}}>{state.response_text}</h1>
      <button className="btn btn-success">Connect to DB</button>
    </div>
  );
}

export default App;
