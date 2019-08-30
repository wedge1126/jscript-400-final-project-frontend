import React from 'react'
import { withRouter } from 'react-router'

class Form extends React.Component {
  constructor (props) {
    super(props)
    const { assignment = {} } = this.props
    const { _id = null, assignment_title = '', project_description = '', project_link = '' } = assignment
    this.state = { 
      errors: [],
      assignment: {
        _id,
        assignment_title, 
        project_description, 
        project_link 
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ assignment: { ...this.state.assignment, [name]: value} })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ errors: [] })
    this.props.onSubmit(this.state.assignment).catch(e => {
      const errors = Array.isArray(e.message) ? e.message : [e.message]
      this.setState({ errors: errors })
    })
  }

  render () {
    const errors = this.state.errors.map((e, idx) => <li key={idx} >{e}</li>)
    return (
      <main className='container'>
        <section className='row justify-content-md-center'>
          <div className='col col-lg-5'>
            <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <label htmlFor='assignment_title'>Assignment Title</label>
                <input
                  className='form-control'
                  id='assignment_title'
                  onChange={this.handleChange}
                  name='assignment_title'
                  type='text'
                  value={this.state.assignment.assignment_title} />
              </div>
              <div className='form-group'>
                <label htmlFor='project_description'>Project Description</label>
                <input
                  className='form-control'
                  id='project_description'
                  onChange={this.handleChange}
                  name='project_description'
                  type='text'
                  value={this.state.assignment.project_description} />
              </div>
              <div className='form-group'>
                <label htmlFor='project_link'>Project Link</label>
                <input
                  className='form-control'
                  id='project_link'
                  onChange={this.handleChange}
                  name='project_link'
                  type='text'
                  value={this.state.assignment.project_link} />
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            {errors.length > 0 &&
              <div className='error-message'>
                <ul>
                  {errors}
                </ul>
              </div>
            }
          </div>
        </section>
      </main>
    )
  }
}

export default withRouter(Form)