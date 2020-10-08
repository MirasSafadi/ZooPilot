import React,{ Component } from 'react';
import {Route,NavLink,HashRouter} from 'react-router-dom';
import './App.css';
import NavBar from './navBar';
import axios from 'axios';
import Home from './Home';
import Users from './Users';
import Sessions from './Sessions';
import Recordings from './Recordings';




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
