import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import List from './List/List'
import PostsContainer from '../posts/Container'
import Edit from './Edit/Edit'

import * as users from '../../api/users'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }
    this.refreshUsers = this.refreshUsers.bind(this)
    this.updateName = this.updateName.bind(this)
  }

  render () {
    const { currentUserId } = this.props
    const { users, loading } = this.state

    if(loading) return <span/>

    return (
      <main className='container'>
        <Route path='/users' exact component={() => <List users={users} />} />
        <Route path='/users/:userId/edit' exact component={
          ({ match }) => <Edit onSubmit={this.updateName} userId={match.params.userId} /> 
        } />
        <PostsContainer currentUserId={currentUserId} users={users} refreshUsers={this.refreshUsers} />
      </main>
    )
  }

  async componentDidMount () {
    const token = window.localStorage.getItem('journal-app')
    if (token) {
      const userList = await users.getUsers()
      this.setState({ users: userList, loading: false })
    } else {
      this.setState({ loading: false })
    }
    
  }

  async refreshUsers() {
    const userList = await users.getUsers()
    this.setState({ users: userList })
  }

  async updateName(userId, name) {
    const { currentUserId, history, onUpdateName } = this.props
    console.log('updating name')
    await users.updateName(userId, name)
    await onUpdateName()
    history.push(`/users/${currentUserId}/posts`)
  }
}

export default withRouter(Container)