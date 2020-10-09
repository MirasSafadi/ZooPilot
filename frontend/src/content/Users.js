import React, { Component } from "react";
import axios from 'axios';
import Modal from '../components/Modal';
import Table from '../components/Table';
 
class Users extends Component {
    constructor(props){
        super(props)
        this.state = {
            users:[],
            showModal: false,
            name:'',
            email:'',
            password1:'',
            password2:''
        }
        this.AddUser = this.AddUser.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.createUser = this.createUser.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.EditUser = this.EditUser.bind(this);
        this.DeleteUser = this.DeleteUser.bind(this);
    }

    componentDidMount(){
        axios.get('http://localhost:8000/api/getUsers')
        .then(res => {
            const res_users = res.data.users
            this.setState({
                users: res_users,
                showModal: false
            });
        })
    }
    shouldComponentUpdate(){
        return true;
    }

    AddUser(){
        this.setState({
            showModal: true
        });
    }
    hideModal(){
        this.setState({
            showModal: false
        });
    }
    //submit form
    createUser(event){
        event.preventDefault();
        let name = this.state.name;
        let email = this.state.email;
        let password1 = this.state.password1;
        let password2 = this.state.password2;
        if(password1 !== password2){
            alert('Passwords don\'t match');
            return;
        }
        var user = {
            'name': name,
            'email': email,
            'password': password1
        };
        //post request to backend
        //need to hash password before saving to database
        this.setState({
            showModal: false,
            name:'',
            email:'',
            password1:'',
            password2:''
        });
        console.log(user);
    }

    changeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    EditUser(user){
        alert(user.password);
    }

    DeleteUser(user){
        alert(user);
    }


    render() {
        const users = this.state.users.map(u => 
            <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                    {/* Call to action buttons */}
                    <ul className="list-inline m-0">
                        <li className="list-inline-item">
                            <button onClick={() => this.EditUser(u)} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></button>
                        </li>
                        <li className="list-inline-item">
                            <button onClick={() => this.DeleteUser(u)} className="btn btn-danger btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Delete"><i className="fa fa-trash"></i></button>
                        </li>
                    </ul>
                </td>
            </tr>
        );
        const button = (
            <button 
                onClick={this.AddUser}
                type="button" 
                className="btn btn-success" 
                style={{float:'right', marginBottom:15}}>
                Add User
            </button>
        );
        return (
            <main>
                <Modal show={this.state.showModal} handleClose={this.hideModal} title='Add User'>
                    <form onSubmit={this.createUser}>
                        <label className="form-label" aria-label="name">Name: </label>
                        <input onChange={this.changeHandler} name="name" className="form-input" placeholder="Enter Full Name"></input><br/>

                        <label className="form-label" aria-label="name">Email: </label>
                        <input onChange={this.changeHandler} name="email" className="form-input" type="text" placeholder="Enter Email"></input><br/>

                        <label className="form-label" aria-label="name">Password: </label>
                        <input onChange={this.changeHandler} name="password1" className="form-input" type="password" placeholder="Enter Password"></input><br/>

                        <label className="form-label" aria-label="name">Confirm Password: </label>
                        <input onChange={this.changeHandler} name="password2" className="form-input" type="password" placeholder="Confirm Password"></input><br/>

                        <button type="submit" className="btn btn-success btn-sm" style={{float:'left', marginBottom:15}}> Add User</button>
                    </form>
                </Modal>
                <Table title="Users" contentArray={users} button={button}>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                    </tr>
                </Table>
            </main>
        );
    }
}
 
export default Users;