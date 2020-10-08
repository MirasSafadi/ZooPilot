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

    AddUser(){
        alert('success')
    }

    render() {
        const users = this.state.users.map(u => 
            <tr key={u.id}>
                <td scope="row">{u.name}</td>
                <td>{u.email}</td>
            </tr>
        );
        return (
            <div className="row">
                <div className="col-lg-7 mx-auto">
                    <div className="card border-0 shadow">
                        <div className="card-body p-5">
                            {/* Responsive table */}
                            <div className="table-responsive">
                                <table className="table m-0">
                                    <thead>
                                        <button 
                                            onClick={this.AddUser} 
                                            id="AddIncomeBtn" 
                                            type="button" 
                                            className="btn btn-success" 
                                            style={{float:'right', marginBottom:15}}>
                                            Add User
                                        </button>
                                        <h3 style={{color:'black;', marginBottom:15, textAlign:'center'}}>Users</h3>
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Users;