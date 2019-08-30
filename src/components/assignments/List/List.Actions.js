import React from 'react'
import { Link } from 'react-router-dom'

export default ({ currentUser, destroyAssignment, assignment}) => (
  <div className='card-footer text-muted d-flex justify-content-around'>
    <Link className='btn btn-link' to={`/assignments/${assignment._id}/edit`}>Edit</Link>
    <button
      className='btn btn-link text-danger'
      onClick={() => destroyAssignment(assignment)}>
      Delete
    </button>
  </div>
)