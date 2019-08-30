import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import List from './List/List'
import NewForm from './Form/New.Form'
import EditForm from './Form/Edit.Form'

import * as assignmentsApi from '../../api/assignments'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      assignments: [],
      loading: true
    }
    this.destroyAssignment = this.destroyAssignment.bind(this)
    this.createAssignment = this.createAssignment.bind(this)
    this.editAssignment = this.editAssignment.bind(this)
  }

  async createAssignment (assignment) {
    const { currentUser, history } = this.props
    const response = await assignmentsApi.createAssignment(currentUser._id, assignment)
    if(response.status !== 201) throw response
    await this.refresh()
    history.push(`/assignments`)
  }

  async destroyAssignment (assignment) {
    const { currentUser, history } = this.props
    await assignmentsApi.deleteAssignment(currentUser._id, assignment)
    await this.refresh()
    history.push(`/assignments`)
  }

  async editAssignment (assignment) {
    const { currentUser, history } = this.props
    const response = await assignmentsApi.updateAssignment(currentUser._id, assignment)
    if(response.status !== 200) throw response
    await this.refresh()
    history.push(`/assignments`)
  }

  render () {
    const { currentUser } = this.props
    if(this.state.loading) return <span/>

    return (
      <>
        <Route path='/assignments' exact component={() => {
          return <List currentUser={currentUser} assignments={this.state.assignments} destroyAssignment={this.destroyAssignment} />
        }} />
        <Route path='/assignments/new' exact component={() => {
          return <NewForm onSubmit={this.createAssignment} />
        }} />
        <Route path='/assignments/:assignmentId/edit' exact component={({ match }) => {
          const assignment = this.state.assignments.find(a => a._id === match.params.assignmentId)
          return <EditForm onSubmit={this.editAssignment} assignment={assignment} />
        }} />
      </>
    )
  }

  async componentDidMount () {
    await this.refresh()
  }

  async refresh() {
    const response = await assignmentsApi.getAssignments(this.props.currentUser._id)
    const assignments = response.response.assignments
    this.setState({ assignments, loading: false })
  }
}

export default withRouter(Container)