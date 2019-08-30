import React from 'react'

export default class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange ({ target: { name, value } }) {
    this.setState({ [name]: value })
  }

  handleSubmit (e) {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render () {
    return (
      <main className='container'>
        <section className='row justify-content-md-center'>
          <div className='col col-lg-5'>
            <h1>Login</h1>
            <form onSubmit={this.handleSubmit}>
              <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input
                  className='form-control'
                  id='email'
                  onChange={this.handleChange}
                  name='email'
                  type='text'
                  value={this.state.email} />
              </div>
              <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input
                  className='form-control'
                  id='password'
                  onChange={this.handleChange}
                  name='password'
                  type='password'
                  value={this.state.password} />
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
          </div>
        </section>
      </main>
    )
  }
}