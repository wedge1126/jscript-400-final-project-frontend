import React from 'react'
import Form from './Form'

export default ({ onSubmit, assignment }) => (
  <section className='container'>
    <h1>Edit Assignment</h1>
    <Form assignment={assignment} onSubmit={onSubmit} />
  </section>
)
