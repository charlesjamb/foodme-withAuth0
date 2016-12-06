import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import {Button} from 'react-bootstrap';
import AuthService from '../../utils/AuthService';
import './Homepage.css';
import HomepageContent from '../HomepageContent/HomepageContent.js';

export class Homepage extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    location: PropTypes.object,
    auth: PropTypes.instanceOf(AuthService)
  }

  render() {
    const {auth} = this.props;
    return (
      <div className="page">
        <header className="header">
          <div className="foodMeLogin">
            <h1><Link to="/" className="foodMe">foodMe.</Link></h1>
            <Button className="loginButton" bsStyle="primary" onClick={auth.login.bind(this)}>LOGIN</Button>
          </div>
        </header>
        <div className="content">
          <HomepageContent/>
        </div>
      </div>
    );
  }
}

export default Homepage;

