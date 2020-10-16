import React, { Component } from "react";
import axios from 'axios';
import Card from '../components/Card';
import Table from '../components/Table';
import {validation_types,validate} from '../inputValidators';


axios.defaults.xsrfHeaderName = "X-CSRFToken";
class Recordings extends Component {
  constructor(props){
    super(props)
    this.state={
      showTable: false,
      recordings: [],
      email: '',
      name:'',
      can_record: false
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.showTableHandler = this.showTableHandler.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.switchRecord = this.switchRecord.bind(this);
  }

  changeHandler(event){
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
        [name]: value
    });
    
  }
  showTableHandler(event){
    event.preventDefault();
    let email = this.state.email.toLowerCase();
    //Input validation
    if(email === ''){
      alert('One or more of the fields is missing.');
      return;
    }
    if(!validate(validation_types.EMAIL,email)){
      this.setState({
          email: email
      })
      document.getElementById('emailTF').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
      alert('Invalid email.');
      return;
    }
    axios.get('http://localhost:8000/api/recordings/' + email)
    .then(response => {
      const recordings = response.data.recordings;
      const name = response.data.name;
      const can_record = response.data.can_record;
      this.setState({
        showTable: true,
        recordings: recordings,
        name: name,
        can_record: can_record
      });
    }).catch(error => {
      if (error.response) {
        var msg = error.response.status+' Error: ' + error.response.data;
        alert(msg);
      }
    });
    
  }
  changeUser(){
    this.setState({
      showTable: false,
      email: ''
    })
  }

  switchRecord(){
    let  record_ability = !this.state.can_record;
    let email = this.state.email;
    //update in db api/switchRecord/
    axios.put('http://localhost:8000/api/recordings/' + email)
    .then(response => {
      this.setState({
        can_record: record_ability
      });
    }).catch(error => {
      if (error.response) {
        var msg = error.response.status+' Error: ' + error.response.data;
        alert(msg);
      }
    });
  }


  render() {

    const sessions = this.state.recordings.map(r => 
      <tr key={r.id}>
          {/* add table data according to recording object attributes */}
          <td>{r.session_owner}</td>
          <td>{r.session_date}</td>
          <td>{r.length} minutes</td>
      </tr>
    );



    const card = (
      <Card title="View a users' recordings">
        <form onSubmit={this.showTableHandler} >

          <label className="form-label" aria-label="name">Email: </label>
          <input id="emailTF" onChange={this.changeHandler} name="email" className="form-control form-control-md" type="text" placeholder="Enter Email" value={this.state.email}></input><br/>

          <button type="submit" className="btn btn-success btn-md btn-block" style={{float:'left', marginBottom:15}}>Search</button>
        </form>
      </Card>
    );
    const button = (
      <button 
          onClick={this.changeUser}
          type="button" 
          className="btn btn-danger" 
          style={{float:'right', marginBottom:15}}>
          Change User
      </button>
    );
    const enableBtn = (
      <button 
          onClick={this.switchRecord}
          type="button" 
          className="btn btn-success" 
          style={{float:'right', marginBottom:15,marginRight:5}}>
          Enable Recordings
      </button>
    );
    const disableBtn = (
      <button 
          onClick={this.switchRecord}
          type="button" 
          className="btn btn-danger" 
          style={{float:'right', marginBottom:15,marginRight:5}}>
          Disable Recordings
      </button>
    );
    const table = (
      //save the current user in state and put name in table title
      <Table title={this.state.name + '\'s '+ 'Recordings'} contentArray={sessions} button={button} actionButton={this.state.can_record?disableBtn: enableBtn}>
        <tr style={{backgroundColor: 'white'}}>
          {/* change according to recording object attributes */}
          <th scope="col">Session Owner</th>
          <th scope="col">Session Date</th>
          <th scope="col">Recording Length</th>
        </tr>
      </Table>
    );
    return (
      <main>
        {!this.state.showTable? card: table}
      </main>
    );
  }
}
 
export default Recordings;