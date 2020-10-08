import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends React.Component{

    render(){
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
            <a className="navbar-brand">ZooPilot</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <a className="nav-item nav-link active" >Home</a>
                <a className="nav-item nav-link active" >Users</a>
                <a className="nav-item nav-link active" >Sessions</a>
                <a className="nav-item nav-link active" >Recordings</a>
                </div>
            </div>
            <a className="nav-item nav-link active" style={{color:'white'}}>Welcome, Admin</a>
            </nav>
        )}
}
export default NavBar