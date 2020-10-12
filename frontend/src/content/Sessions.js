import React, { Component } from "react";
import axios from 'axios';
import Card from '../components/Card';
import Table from '../components/Table';
import Modal from '../components/Modal';
import TableScrollbar from 'react-table-scrollbar';
 
class Sessions extends Component {
  constructor(props){
    super(props)
    this.state={
      showTable: false,
      showParticipantsModal: false,
      sessions: [],
      email: '',
      owner:''
    }
    this.changeHandler = this.changeHandler.bind(this);
    this.showTableHandler = this.showTableHandler.bind(this);
    this.viewParticipantsHandler = this.viewParticipantsHandler.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.closeModal = this.closeModal.bind(this);
    
    this.participants = [];
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
    var email = this.state.email;

    //fetch sessions from database and save it in state.sessions
    axios.get('http://localhost:8000/api/sessions/' + email)
    .then(res => {
      const res_sessions = res.data.sessions;
      const owner = res.data.owner_name;
      this.setState({
        sessions: res_sessions,
        owner: owner,
        showTable: true,
      });
    }).catch((error) => {
      alert(error);
    });
  }


  viewParticipantsHandler(session){
    axios.get('http://localhost:8000/api/participants/'+session.id)
    .then(response => {
        let res_participants = response.data.participants;
        this.participants = res_participants.map(p => 
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.email}</td>
            </tr>
        );
        this.setState({
              showParticipantsModal: true
        })
    })
    
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
    axios.get('http://localhost:8000/api/sessions/' + email)
    .then(res => {
      const res_sessions = res.data.sessions;
      this.setState({
        sessions: res_sessions
      });
    }).catch(err => {
      alert(err.message)
    })
  }
  closeModal(){
    this.setState({
      showParticipantsModal: false
    })
  }
  refreshParticipantsList(){
    console.log('refreshed!')
  }

  render() {
    let sessions = [];
    if(Array.isArray(this.state.sessions) && this.state.sessions.length){
      
      sessions = this.state.sessions.map(s => 
        <tr key={s.id}>
          {/* add table data according to session object attributes */}
          <td>{s.date}</td>
          <td>{s.recording_enabled}</td>
          <td>{s.number_of_participants}</td>
          {s.number_of_participants>0 && 
              <td>
                  {/* Call to action buttons */}
                  <ul className="list-inline m-0">
                      <li className="list-inline-item">
                          <button onClick={() => this.viewParticipantsHandler(s)} className="btn btn-secondary btn-sm rounded-2" type="button" >View Participants</button>
                      </li>
                  </ul>
              </td>
          }
          
        </tr>
      );
    }
    const card = (
      <Card title="View a users' sessions">
        <form onSubmit={this.showTableHandler} >

          <label className="form-label" aria-label="name">Email: </label>
          <input onChange={this.changeHandler} name="email" className="form-control form-control-md" type="text" placeholder="Enter Email" value={this.state.email}></input><br/>

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
    const table = (
      
      <Table title={this.state.owner+'\'s sessions'} contentArray={sessions} button={button} refreshHandler={this.refreshList}>
        <tr>
          <th scope="col">Session Date</th>
          <th scope="col">Recording Enabled?</th>
          <th scope="col">No. of Participants</th>
          <th scope="col"></th>
        </tr>
      </Table>
    );
    return (
      <main>
        <Modal show={this.state.showParticipantsModal} handleClose={this.closeModal} title="Participants in this session">
            <button onClick={this.refreshParticipantsList} type="button" className="btn btn-secondary btn-sm btn-block" style={{float:'right', marginBottom:5}}>Refresh</button>
            {/* Responsive table */}
            <div className="table-responsive">
                <TableScrollbar rows={2}>
                <table className="table m-1">   
                    <thead >
                      <tr style={{ backgroundColor: 'white'}}>
                        <th scope="col" style={{position: 'sticky'}}>Name</th>
                        <th scope="col" style={{position: 'sticky'}}>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                        {this.participants}
                    </tbody>
                </table>
                </TableScrollbar>
            </div>

          {/* <Table contentArray={this.participants} refreshHandler={this.refreshParticipantsList}>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
            </tr>
          </Table> */}
        </Modal>
        {!this.state.showTable? card: table}
      </main>
    );
  }
}
 
export default Sessions;