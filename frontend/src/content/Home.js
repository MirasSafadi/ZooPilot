import React, { Component } from "react";
import Card from '../components/Card';
 
class Home extends Component {
  render() {
    return (
      <Card title="Welcome, Admin">
        <p>
          Here you can view all the users registered to ZooPilot.<br/>
          You can also edit the details of each user, add new users, and delete users.<br/>
          For the sake of the our users' privacy we cannot let you edit or see the passwords.<br/>
          In fact, all the passwords are hashed usign SHA-256 algorithm to insure the privacy of our users.

        </p>

      </Card>
    );
  }
}
 
export default Home;