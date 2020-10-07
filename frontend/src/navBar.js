import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends React.Component{

    render(){
        return (
            <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
            <a class="navbar-brand">ZooPilot</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                <a class="nav-item nav-link active" >Home</a>
                <a class="nav-item nav-link active" >Users</a>
                <a class="nav-item nav-link active" >Sessions</a>
                <a class="nav-item nav-link active" >Recordings</a>
                </div>
            </div>
            <p style={{color: "white"}}>Welcome, Admin</p>
            </nav>
        )}
}
export default NavBar