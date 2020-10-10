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
            showUpdateModal: false,
            name:'',
            email:'',
            password1:'',
            password2:''
        }
        this.showModal = this.showModal.bind(this);
        this.showUpdateModal = this.showUpdateModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.createUser = this.createUser.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.DeleteUser = this.DeleteUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.resetToDefaults = this.resetToDefaults.bind(this);
        this.refreshList = this.refreshList.bind(this);
    }

    componentDidMount(){
        
        axios.get('http://localhost:8000/api/getUsers')
        .then(res => {
            const res_users = res.data.users
            this.setState({
                users: res_users,
                showModal: false,
                showUpdateModal:false
            });
        })
        console.log('component did mount')
    }

    showModal(){
        this.setState({
            showModal: true
        });
    }
    showUpdateModal(user){
        this.setState({
            name: user.name,
            email: user.email,
            showUpdateModal: true
        });
    }
    hideModal(){
        this.resetToDefaults();
    }
    
    //submit add user form
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
            name: name,
            email: email,
            password: password1
        };

        //post request to backend
        axios.post('http://localhost:8000/api/addUser/',user)
        .then(res =>{
            alert('success')
        }).catch(err =>{
            alert('Failure: '+ err.message)
        })
        this.resetToDefaults();
    }
    //submit update user form
    updateUser(event){
        event.preventDefault();
        let name = this.state.name;
        let email = this.state.email;
        var user = {
            name: name,
            email: email
        };
        axios.put('http://localhost:8000/api/updateUser/'+email,user)
        .then(res => {
            //update the list
            this.refreshList();
        }).catch(err => {
            alert('Failure: '+ err.message)
        })
        this.resetToDefaults();
    }

    changeHandler(event){
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value
        });
    }


    DeleteUser(user){
        axios.delete('http://localhost:8000/api/deleteUser/'+user.email)
        .then(res => {
            //update the list
            axios.get('http://localhost:8000/api/getUsers')
            .then(res => {
                const res_users = res.data.users
                this.setState({
                    users: res_users
                });
            })
        }).catch(err => {
            alert(err.message);
        })
    }

    resetToDefaults(){
        this.setState({
            showModal: false,
            showUpdateModal:false,
            name:'',
            email:'',
            password1:'',
            password2:''
        });
    }
    refreshList(){

        axios.get('http://localhost:8000/api/getUsers')
        .then(res => {
            const res_users = res.data.users
            this.setState({
                users: res_users
            });
        })
        
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
                            <button onClick={() => this.showUpdateModal(u)} className="btn btn-success btn-sm rounded-0" type="button" data-toggle="tooltip" data-placement="top" title="Edit"><i className="fa fa-edit"></i></button>
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
                onClick={this.showModal}
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
                        <input onChange={this.changeHandler} name="name" className="form-input" placeholder="Enter Full Name" value={this.state.name}></input><br/>

                        <label className="form-label" aria-label="name">Email: </label>
                        <input onChange={this.changeHandler} name="email" className="form-input" type="text" placeholder="Enter Email" value={this.state.email}></input><br/>

                        <label className="form-label" aria-label="name">Password: </label>
                        <input onChange={this.changeHandler} name="password1" className="form-input" type="password" placeholder="Enter Password" value={this.state.password1}></input><br/>

                        <label className="form-label" aria-label="name">Confirm Password: </label>
                        <input onChange={this.changeHandler} name="password2" className="form-input" type="password" placeholder="Confirm Password" value={this.state.password2}></input><br/>

                        <button type="submit" className="btn btn-success btn-sm" style={{float:'left', marginBottom:15}}>Add User</button>
                    </form>
                </Modal>
                <Modal show={this.state.showUpdateModal} handleClose={this.hideModal} title='Update User'>
                    <form onSubmit={this.updateUser}>

                        <label className="form-label" aria-label="name">Name: </label>
                        <input onChange={this.changeHandler} name="name" className="form-input" placeholder="Enter Full Name" value={this.state.name}></input><br/>

                        <label className="form-label" aria-label="name">Email: </label>
                        <input onChange={this.changeHandler} name="email" className="form-input" type="text" placeholder="Enter Email" value={this.state.email}></input><br/>

                        <button type="submit" className="btn btn-success btn-sm" style={{float:'left', marginBottom:15}}>Update User</button>
                    </form>
                </Modal>
                <Table title="Users" contentArray={users} button={button} refreshHandler={this.refreshList}>
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