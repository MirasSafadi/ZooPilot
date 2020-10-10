import React, { Component } from "react";
import axios from 'axios';
import Card from '../components/Card';
import Table from '../components/Table';
 
class Sessions extends Component {
  constructor(props){
    super(props)
    this.state={
      showTable: false,
      sessions: [],
      email: '',
      owner:''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.showTableHandler = this.showTableHandler.bind(this);
    this.viewParticipantsHandler = this.viewParticipantsHandler.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.refreshList = this.refreshList.bind(this);
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
    let email = this.state.email;
    //fetch sessions from database and save it in state.sessions
    axios.get('http://localhost:8000/api/getSessions/' + email)
    .then(res => {
      const res_sessions = res.data.sessions;
      const owner = res.data.owner_name;
      this.setState({
        sessions: res_sessions,
        owner: owner,
        showTable: true,
      });
    }).catch(err => {
      alert(err.message)
    })
    
  }
  viewParticipantsHandler(session){

  }
  changeUser(){
    this.setState({
      showTable: false,
      sessions:[],
      email: '',
      owner:''
    })
  }
  refreshList(){
    let email = this.state.email;
    if(email === '') return;
    axios.get('http://localhost:8000/api/getSessions/' + email)
    .then(res => {
      const res_sessions = res.data.sessions;
      this.setState({
        sessions: res_sessions
      });
    }).catch(err => {
      alert(err.message)
    })
  }

  render() {
    const sessions = this.state.sessions.map(s => 
      <tr key={s.id}>
        {/* add table data according to session object attributes */}
        <td>{s.date}</td>
        <td>{s.recording_enabled}</td>
        <td>{s.number_of_participants}</td>
        <td>
            {/* Call to action buttons */}
            <ul className="list-inline m-0">
                <li className="list-inline-item">
                    <button onClick={() => this.viewParticipantsHandler(s)} className="btn btn-secondary btn-sm rounded-2" type="button" >View Participants</button>
                </li>
            </ul>
        </td>
      </tr>
    );
    const card = (
      <Card title="View a users' sessions">
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
          className="btn btn-danger" 
          style={{float:'right', marginBottom:15}}>
          Change User
      </button>
    );
    const table = (
      //save the current user in state and put name in table title
      <Table title={this.state.owner+'\'s sessions'} contentArray={sessions} button={button} refreshHandler={this.refreshList}>
        <tr>
          {/* change according to session object attributes */}
          <th scope="col">Session Date</th>
          <th scope="col">Recording Enabled?</th>
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
 
export default Sessions;