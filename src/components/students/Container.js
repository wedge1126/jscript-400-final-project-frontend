import React from 'react'
import { Route } from 'react-router-dom'
import { withRouter } from 'react-router'
import { getToken } from '../../helpers/local-storage'
import List from './List/List'

import * as students from '../../api/students'

class Container extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      students: [],
      loading: true
    }
  }

  render () {
    const { currentUser } = this.props
    const { students, loading } = this.state

    if(loading) return <span/>

    return (
      <main className='container'>
        <Route path='/students' exact component={() => <List students={students} currentUser={currentUser} />} />
      </main>
    )
  }

  async componentDidMount () {
    const token = getToken()
    if (token) {
      const studentList = await students.getStudents()
      this.setState({ students: studentList, loading: false })
    } else {
      this.setState({ loading: false })
    }
    
  }
}

export default withRouter(Container)