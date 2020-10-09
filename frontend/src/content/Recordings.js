import React, { Component } from "react";
import Card from '../components/Card';
import Table from '../components/Table';
 
class Recordings extends Component {
  constructor(props){
    super(props)
    this.state={
      showTable: false,
      recordings: [],
      email: ''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.showTableHandler = this.showTableHandler.bind(this);
    this.changeUser = this.changeUser.bind(this);
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
    console.log(this.state.email);
    //fetch recordings from database and save it in state.recordings
    this.setState({
      showTable: true,
      email: ''
    });
  }
  changeUser(){
    this.setState({
      showTable: false
    })
  }

  render() {

    const sessions = this.state.recordings.map(r => 
      <tr key={r.id}>
          {/* add table data according to recording object attributes */}
      </tr>
    );



    const card = (
      <Card title="View a users' recordings">
        <form onSubmit={this.showTableHandler} >

          <label className="form-label" aria-label="name">Email: </label>
          <input onChange={this.changeHandler} name="email" className="form-input" type="text" placeholder="Enter Email" value={this.state.email}></input><br/>

          <button type="submit" className="btn btn-success btn-sm" style={{float:'left', marginBottom:15}}>Search</button>
        </form>
      </Card>
    );
    const button = (
      <button 
          onClick={this.changeUser}
          type="button" 
          className="btn btn-success" 
          style={{float:'right', marginBottom:15}}>
          Change User
      </button>
    );
    const table = (
      //save the current user in state and put name in table title
      <Table title="users' sessions" contentArray={sessions} button={button}>
        <tr>
          {/* change according to recording object attributes */}
          <th scope="col">Session Owner</th>
          <th scope="col">Session Date</th>
          <th scope="col">Recording Owner</th>
          <th scope="col">No. of Participants</th>
          <th scope="col"></th>
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