import React, { Component } from "react";
import Card from '../components/Card';
 
class Home extends Component {
  render() {
    return (
      <Card title="Welcome to ZooPilot">
            <p>
              Here you can view all the users registered to ZooPilot.<br/>
              You can also edit the details of each user, add new users, and delete users.<br/>
              For the sake of the our users' privacy we cannot let you edit or see the passwords.<br/>
              In fact, all the passwords are hashed usign SHA-256 algorithm to insure the privacy of our users.<br/>
              As an admin you can:
            </p>
            <ul>
              <li>View a users' sessions.</li>
              <li>View a users' recordings.</li>
              <li>View a sessions' participants.</li>
              <li>Block/Unblock a user from recording.</li>
            </ul>
            <p>
              You can Naviagte between actions using the navigation bar on the top of the screen.<br/>
              Each action page has clear instructions of use.
            </p>
            <center><h5>Happy Administrating!</h5></center>
            
      </Card>
    );
  }
}
 
export default Home;