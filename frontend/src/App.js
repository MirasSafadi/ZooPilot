import React,{ Component } from 'react';
import {Route,HashRouter} from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import axios from 'axios';
import Home from './content/Home';
import Users from './content/Users';
import Sessions from './content/Sessions';
import Recordings from './content/Recordings';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
axios.defaults.xsrfCookieName = "csrftoken"




class App extends Component {
  constructor(props){
    super(props)
    this.state={
      response_text: ''
    }
  }
  componentDidMount(){
    axios.get('http://localhost:8000/api/index')
      .then(res => {
        const res_text = res.data.response_text
        this.setState({
          response_text: res_text
        });
      })
  }



  render() {
    return (
      <HashRouter>
        <NavBar />
        <br/>
        <div className="content">
          <Route exact path="/" component={Home}/>
          <Route path="/Users" component={Users}/>
          <Route path="/Sessions" component={Sessions}/>
          <Route path="/Recordings" component={Recordings}/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
