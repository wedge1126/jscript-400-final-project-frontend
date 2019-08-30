import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import List from './List/List'

import * as assignmentsApi from '../../api/assignments'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assignments: [],
      loading: true
    }
  }

  // async createPost (post) {
  //   const { currentUserId, history, refreshUsers } = this.props
  //   console.log('Submitting Post:', post)
  //   await postsApi.createPost(currentUserId, post)
  //   await refreshUsers()
  //   history.push(`/users/${currentUserId}/posts`)
  // }

  // async destroyPost (post) {
  //   const { currentUserId, history, refreshUsers } = this.props
  //   console.log('Destroying Post:', post)
  //   await postsApi.deletePost(currentUserId, post)
  //   await refreshUsers()
  //   history.push(`/users/${currentUserId}/posts`)
  // }

  // async editPost (post) {
  //   const { currentUserId, history, refreshUsers } = this.props
  //   console.log('Editting Post:', post)
  //   await postsApi.updatePost(currentUserId, post)
  //   await refreshUsers()
  //   history.push(`/users/${currentUserId}/posts`)
  // }

  async getAssignments() {

  }

  render () {
    const { currentUser } = this.props
    if(this.state.loading) return <span/>

    return (
      <>
        <Route path='/assignments' exact component={() => {
          return <List currentUser={currentUser} assignments={this.state.assignments} />
        }} />
      </>
    )
  }

  async componentDidMount () {
    const response = await assignmentsApi.getAssignments(this.props.currentUser._id)
    const assignments = response.response.assignments
    this.setState({ assignments, loading: false })
  }
}

export default withRouter(Container)