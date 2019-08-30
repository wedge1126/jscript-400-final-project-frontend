import React from 'react'
import Actions from './List.Actions'

export default ({ currentUser, assignments }) => {
  console.log(assignments)
  const assignmentCards = assignments.map(assignment => (
    <div key={assignment._id} className='card'>
      <div className='card-title'>
        <span className='grade'>{assignment.grade && assignment.maxGrade ? `${assignment.grade}/${assignment.maxGrade}` : `Grading TBD`}</span>
        <span>{assignment.assignment_title}</span>
      </div>
      <div className='card-body'>
        <p className='card-text'>{ assignment.project_description }</p>
        <a href={assignment.project_link}>Project Link</a>
      </div>
      <Actions currentUser={currentUser} assignment={assignment} />
    </div>
  ))

  if(assignments.length === 0) {
    return <h1 className='mb-4'>You have no assignments.</h1>
  }

  return (
    <>
      { assignmentCards }
    </>
  )
}
