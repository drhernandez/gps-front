import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class Login extends React.Component {
  static propTypes = {
    router: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      query: PropTypes.object.isRequired,
    }),
  }

  state = {
    idToken: null,
  }

  componentWillMount() {
    this.lock = new Auth0Lock(process.env.AUTH0_PUB_KEY, process.env.AUTH0_DOMAIN);
    this.setIdToken();
  }

  setIdToken() {
    const idToken = this.getIdToken();
    if (idToken) {
      this.setState({idToken});

      if (this.props.location.query && this.props.location.query.redirectUri) {
        this.props.router.replace(decodeURIComponent(this.props.location.query.redirectUri));
      } else {
        this.props.router.replace('/');
      }
    }
  }

  getIdToken() {
    let idToken = localStorage.getItem('userToken');
    const authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        /* eslint-disable no-console */
        console.error('Error fetching user hash: ', authHash.error);
        /* eslint-enable no-console */
      }
    }
    return idToken;
  }

  showLock() {
    this.lock.show();
  }

  render() {
    if (this.state.idToken) {
      return null;
    }

    this.showLock();
    return <main className='auth-main' />;
  }
}

export default withRouter(Login);
