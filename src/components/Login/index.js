import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    errorMsg: '',
    isError: false,
    username: '',
    password: '',
  }

  componentWillUnmount() {
    this.setState({username: '', password: ''})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.setState({
        errorMsg: data.error_msg,
        isError: true,
      })
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {isError, errorMsg, username, password} = this.state
    return (
      <form onSubmit={this.onSubmitForm} className="bgLogin">
        <div className="login">
          <h1 className="loginHead">Restaurant App</h1>
          <div className="inputCont">
            <label className="labelPara" htmlFor="username">
              USERNAME
            </label>
            <input
              onChange={this.onChangeUsername}
              value={username}
              id="username"
              className="inputBox"
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="inputCont">
            <label className="labelPara" htmlFor="password">
              PASSWORD
            </label>
            <input
              onChange={this.onChangePassword}
              value={password}
              id="password"
              className="inputBox"
              placeholder="Password"
              type="password"
            />
          </div>
          <button className="loginBtn" type="submit">
            Login
          </button>
          {isError && <p className="errorLogin">*{errorMsg}</p>}
        </div>
      </form>
    )
  }
}

export default Login
