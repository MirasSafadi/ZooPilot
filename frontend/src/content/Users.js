import React, { Component } from "react";
import axios from 'axios';
import Modal from '../components/Modal';
import Table from '../components/Table';
import {validation_types,validate} from '../inputValidators';


axios.defaults.xsrfHeaderName = "X-CSRFToken";
const cached_users = 'cached_users';

class Users extends Component {
    
    constructor(props){
        super(props)
        this.state = {
            users:[],
            showModal: false,
            showUpdateModal: false,
            name:'',
            email:'',
            id:'',
            password1:'',
            password2:'',
            can_record: false
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
        this.handleWindowClose = this.handleWindowClose.bind(this);

        if(!localStorage.getItem(cached_users)){
            //if not defined, define it
            localStorage.setItem(cached_users,"");
        }
    }

    handleWindowClose(){
        localStorage.removeItem(cached_users);
    }

    componentDidMount(){
        window.addEventListener('beforeunload', this.handleWindowClose);
        if(localStorage.getItem(cached_users) === "")
            this.refreshList();
        else{
            this.setState({
                users: JSON.parse(localStorage.getItem(cached_users))
            })
        }
            
    }
    componentWillUnmount(){
        localStorage.setItem(cached_users,JSON.stringify(this.state.users));
        window.removeEventListener('beforeunload', this.handleWindowClose);
    }

    showModal(){
        this.setState({
            showModal: true
        });
    }
    showUpdateModal(user){

        this.setState({
            id: user.id,
            name: user.name,
            email: user.email,
            can_record: user.can_record,
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
        let email = this.state.email.toLowerCase();
        let can_record = this.state.can_record;
        let password1 = this.state.password1;
        let password2 = this.state.password2;

        //Input validation
        if(name === '' || email === '' || password1 === '' || password2 === ''){
            alert('One or more of the fields is missing.');
            return;
        }
        
        var isValid = true;
        //Validate name
        if(!validate(validation_types.NAME,name)){
            isValid = false;
            this.setState({
                name: ''
            })
            document.getElementById('nameTF').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            alert("Name must contain only alphabetical characters.");
            
        }
        //validate email - The validation is in a different function because the regex is too long and would make this function unreadable.
        if(!validate(validation_types.EMAIL,email)){
            isValid = false;
            this.setState({
                email: ''
            })
            document.getElementById('emailTF').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            alert('Invalid email.');
        }
        //Validate password
        var passAlert = 'Password must contain at least:\n'+
                        '• 1 lowercase alphabetical character.\n'+
                        '• 1 uppercase alphabetical character.\n'+
                        '• 1 numeric character.\n'+
                        '• 6 characters.\n'
        if(!validate(validation_types.PASSWORD,password1)){
            isValid = false;
            //reset the passwords TF's
            this.setState({
                password1: '',
                password2: ''
            })
            document.getElementById('pass1').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            document.getElementById('pass2').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            alert(passAlert);
            
        }

        if(!isValid)
            return;

        if(password1 !== password2){
            document.getElementById('pass1').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            document.getElementById('pass2').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            alert('Passwords don\'t match');
            return;
        }

        //========================================================================================================
        //input is valid, save user in DB
        var user = {
            name: name,
            email: email,
            can_record: can_record,
            password: password1
        };

        //post request to backend
        axios.post('http://localhost:8000/api/users/',user)
        .then(res =>{
            this.refreshList();
            alert('success')
        }).catch(error =>{
            if (error.response) {
                var msg = error.response.status+' Error: ' + error.response.data;
                alert(msg);
            }
        })
        this.resetToDefaults();
    }
    //submit update user form
    updateUser(event){
        event.preventDefault();
        let name = this.state.name;
        let email = this.state.email.toLowerCase();
        let can_record = this.state.can_record;
        let id = this.state.id;

        //Input validation
        if(name === '' || email === ''){
            alert('One or more of the fields is missing.');
            return;
        }
        
        var isValid = true;
        //Validate name
        if(!validate(validation_types.NAME,name)){
            isValid = false;
            this.setState({
                name: name
            })
            document.getElementById('uNameTF').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            alert("Name must contain only alphabetical characters.");
            
        }
        //validate email - The validation is in a different function because the regex is too long and would make this function unreadable.
        if(!validate(validation_types.EMAIL,email)){
            isValid = false;
            this.setState({
                email: email
            })
            document.getElementById('uEmailTF').style.boxShadow = '0 0 5px rgb(255, 0, 0)';
            alert('Invalid email.');
        }
        if(!isValid)
            return;
        //================================================================================
        //input is valid update user in DB
        var user = {
            name: name,
            email: email,
            can_record: can_record
        };
        axios.put('http://localhost:8000/api/users/'+id,user)
        .then(res => {
            //update the list
            this.refreshList();
            alert('success')
        }).catch(error => {
            if (error.response) {
                var msg = error.response.status+' Error: ' + error.response.data;
                alert(msg);
            }
        })
        this.resetToDefaults();
    }
    DeleteUser(user){
        axios.delete('http://localhost:8000/api/users/'+user.id)
        .then(res => {
            //update the list
            this.refreshList();
            alert('success');
        }).catch(error => {
            if (error.response) {
                var msg = error.response.status+' Error: ' + error.response.data;
                alert(msg);
            }
        })
    }

    changeHandler(event){
        //reset the styles once typing begins
        document.getElementById('pass1').style.boxShadow = '';
        document.getElementById('pass2').style.boxShadow = '';
        document.getElementById('nameTF').style.boxShadow = '';
        document.getElementById('emailTF').style.boxShadow = '';
        document.getElementById('uNameTF').style.boxShadow = '';
        document.getElementById('uEmailTF').style.boxShadow = '';
        let name = event.target.name;
        let value = event.target.value;
        
        this.setState({
            [name]: value
        });
    }


    resetToDefaults(){
        document.getElementById('pass1').style.boxShadow = '';
        document.getElementById('pass2').style.boxShadow = '';
        document.getElementById('nameTF').style.boxShadow = '';
        document.getElementById('emailTF').style.boxShadow = '';
        document.getElementById('uNameTF').style.boxShadow = '';
        document.getElementById('uEmailTF').style.boxShadow = '';
        this.setState({
            showModal: false,
            showUpdateModal:false,
            id:'',
            name:'',
            email:'',
            password1:'',
            password2:''
        });
    }
    refreshList(){
        
        axios.get('http://localhost:8000/api/users')
        .then(res => {
            const res_users = res.data.users
            this.setState({
                users: res_users
            });
        }).catch(error =>{
            if (error.response) {
                var msg = error.response.status+' Error: ' + error.response.data;
                alert(msg);
            }
        })
        
    }

    render() {
        const users = this.state.users.map(u => 
            <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.can_record? 'Yes': 'No'}</td>
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
                        <input id="nameTF" onChange={this.changeHandler} name="name" className="form-control form-control-md" placeholder="Enter Full Name" value={this.state.name} />

                        <label className="form-label" aria-label="email">Email: </label>
                        <input id="emailTF" onChange={this.changeHandler} name="email" className="form-control form-control-md" type="text" placeholder="Enter Email" value={this.state.email} />
                        
                        <div className="form-check" style={{marginBottom: 5, marginTop: 5}}>
                            <input type="checkbox" className="form-check-input" onChange={() => {this.setState(prevState => ({ can_record: !prevState.can_record}));}} />
                            <label className="form-check-label" aria-label="can record">Can Record</label>
                        </div>
                        
                        <label className="form-label" aria-label="password">Password: </label>
                        <input id="pass1" onChange={this.changeHandler} name="password1" className="form-control form-control-md" type="password" placeholder="Enter Password" value={this.state.password1} />

                        <label className="form-label" aria-label="confirm password">Confirm Password: </label>
                        <input id="pass2" onChange={this.changeHandler} name="password2" className="form-control form-control-md" type="password" placeholder="Confirm Password" value={this.state.password2} /><br/>

                        <button type="submit" className="btn btn-success btn-md" style={{float:'right', marginBottom:15}}>Add User</button>
                    </form>
                </Modal>
                <Modal show={this.state.showUpdateModal} handleClose={this.hideModal} title='Update User'>
                    <form onSubmit={this.updateUser}>

                        <label className="form-label" aria-label="name">Name: </label>
                        <input id="uNameTF" onChange={this.changeHandler} name="name" className="form-control form-control-md" placeholder="Enter Full Name" value={this.state.name} />

                        <label className="form-label" aria-label="email">Email: </label>
                        <input id="uEmailTF" onChange={this.changeHandler} name="email" className="form-control form-control-md" type="text" placeholder="Enter Email" value={this.state.email} />

                        <div className="form-check" style={{marginBottom: 5, marginTop: 5}}>
                            <input type="checkbox" className="form-check-input" onChange={() => {this.setState(prevState => ({ can_record: !prevState.can_record}));}} checked={this.state.can_record}/>
                            <label className="form-check-label" aria-label="can record">Can Record</label>
                        </div>

                        <button type="submit" className="btn btn-success btn-md" style={{float:'right', marginBottom:15}}>Update User</button>
                    </form>
                </Modal>
                <Table title="Users" contentArray={users} button={button} refreshHandler={this.refreshList}>
                    <tr style={{backgroundColor: 'white'}}>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Can Record</th>
                        <th scope="col"></th>
                    </tr>
                </Table>
            </main>
        );
    }
}
 
export default Users;