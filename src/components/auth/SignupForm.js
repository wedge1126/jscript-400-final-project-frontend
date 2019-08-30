import React from 'react'
import '../App.css'

export default class SignupForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: [],
      user: {
        first_name: '',
        last_name: '',
        email: '',
        password: ''
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ user: { ...this.state.user, [name]: value} })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.setState({ errors: [] })
    this.props.onSubmit(this.state.user).catch(e => {
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
            <h1>Signup</h1>
            <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
                <label htmlFor='first_name'>First Name</label>
                <input
                  className='form-control'
                  id='first_name'
                  onChange={this.handleChange}
                  name='first_name'
                  type='text'
                  value={this.state.user.first_name} />
              </div>
              <div className='form-group'>
                <label htmlFor='last_name'>Last Name</label>
                <input
                  className='form-control'
                  id='last_name'
                  onChange={this.handleChange}
                  name='last_name'
                  type='text'
                  value={this.state.user.last_name} />
              </div>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  className='form-control'
                  id='email'
                  onChange={this.handleChange}
                  name='email'
                  type='text'
                  value={this.state.user.email} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  className='form-control'
                  id='password'
                  onChange={this.handleChange}
                  name='password'
                  type='password'
                  value={this.state.user.password} />
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