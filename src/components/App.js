import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './shared/Header'
import Navigation from './shared/Navigation/Navigation'
import Login from './auth/LoginForm'
import Signup from './auth/SignupForm'
import UsersContainer from './users/Container'
import * as auth from '../api/auth'
import { getToken } from '../helpers/local-storage'

class App extends React.Component {
  constructor () {
    super()
    this.state = {
      currentUser: null,
      loading: true
    }

    this.loginUser = this.loginUser.bind(this)
    this.signupUser = this.signupUser.bind(this)
    this.logoutUser = this.logoutUser.bind(this)
  }

  async loginUser (user) {
    await auth.login(user)
    const profile = await auth.profile()
    this.setState({
      currentUser: profile.user })
  }

  logoutUser() {
    auth.logout()
    this.setState({
      currentUser: null
    })
  }

  async signupUser (user) {
    const response = await auth.signup(user)
    if(response.status !== 200) {
      throw response
    }
    const profile = await auth.profile()
    this.setState({
      currentUser: profile.user
    })
  }

  render () {
    const { currentUser, loading } = this.state

    if(loading) return <p>loading...</p>

    return (
      <Router>
        <Header />
        <Navigation currentUser={currentUser} logoutUser={this.logoutUser} />
        <Switch>
          <Route path='/login' exact component={() => {
            return currentUser ? <Redirect to='/users' /> : <Login onSubmit={this.loginUser} />
          }} />
          <Route path='/signup' exact component={() => {
            return currentUser ? <Redirect to='/users' /> : <Signup onSubmit={this.signupUser} />
          }} />

          <Route path='/users' render={() => {
            return  currentUser ? <UsersContainer currentUser={currentUser} /> : <Redirect to='/login' />
          }} />
          <Redirect to='/login' />
        </Switch>
      </Router>
    )
  }

  async componentDidMount () {
    const token = getToken()
    if (token) {
      const profile = await auth.profile()
      if(profile.user) {
        this.setState({ 
          currentUser: profile.user, 
        })
      } else {
        this.logoutUser()
      }
    } 
    this.setState({ loading: false })
  }
}

export default App
