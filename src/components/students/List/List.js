import React from 'react'
import '../../App.css'

export default ({ students, currentUser }) => {
  const studentCards = students.map(student => {
    let grade = 0;
    let gradeClass = ''
    if(currentUser.isAdmin) {
      const total = student.assignments.reduce((acc, curr) => acc + (curr.grade && curr.maxGrade ? curr.grade : 0), 0)
      const maximum = student.assignments.reduce((acc, curr) => acc + (curr.maxGrade && curr.grade ? curr.maxGrade : 0), 0)
      grade = total/maximum*100
      if(grade >= 90) gradeClass = 'grade good-grade'
      else if(grade < 70) gradeClass = 'grade bad-grade'
      else gradeClass = 'grade'
    }
    return (
      <div key={student._id} className='card'>
        <div className='card-body'>

          { currentUser.isAdmin &&
            <div className={gradeClass}>{isNaN(grade) ? '' : `${grade.toFixed(0)}%`}</div>
          }
          <p className='card-text'>{`${student.first_name} ${student.last_name}`} - {student.email}</p>
        </div>
      </div> 
    )
  })

  return (
    <>
      { studentCards }
    </>
  )
}
