import React, { Component } from "react";
import axios from 'axios';
 
class Users extends Component {


    constructor(props){
        super(props)
        this.state = {
            users:[]
        }
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/getUsers')
        .then(res => {
            const res_users = res.data.users
            this.setState({
                users: res_users
            });
        })
    }


    render() {
        const users = this.state.users.map(u => <li key={u.id}>name: {u.name}, email: {u.email}</li>)
        return (
          <div>
            <h2 style={{color: 'white'}}>Users</h2>
            <p>Mauris sem velit, vehicula eget sodales vitae,
            rhoncus eget sapien:</p>
            <ul>
                {users}
            </ul>
          </div>
        );
    }
}
 
export default Users;