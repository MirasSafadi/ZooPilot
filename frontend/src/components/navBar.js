import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {NavLink,HashRouter} from 'react-router-dom';

class NavBar extends React.Component{

    render(){
        return (
            <HashRouter>
                <nav className="navbar navbar-expand-sm navbar-dark bg-primary" style={{width:'100%'}}>
                <a className="navbar-brand">ZooPilot</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" exact to="/">Home</NavLink>
                        <NavLink className="nav-item nav-link" to="/Users">Users</NavLink>
                        <NavLink className="nav-item nav-link" to="/Sessions">Sessions</NavLink>
                        <NavLink className="nav-item nav-link" to="/Recordings">Recordings</NavLink>
                    </div>
                </div>
                <a className="nav-item nav-link" style={{color:'white'}}>Welcome, Admin</a>
                </nav>
            </HashRouter>
        )}
}
export default NavBar