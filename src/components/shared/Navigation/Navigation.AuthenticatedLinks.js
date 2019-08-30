import React from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import '../../App.css'

const AuthenticatedLinks = ({ currentUser, logoutUser, history }) => {
  const logout = () => {
    logoutUser()
    history.push('/login')
  }

  return (
    <>
      <ul className='nav justify-content-end'>

        { !currentUser.isAdmin &&
          <li className='nav-item'>
            <Link className='nav-link' to='/assignments'>Home</Link>
          </li>
        }

        <li className='nav-item'>
          <Link className='nav-link' to='/students'>All Students</Link>
        </li>

        { !currentUser.isAdmin &&
          <li className='nav-item'>
            <Link className='nav-link' to={`/assignments/new`}>
              Create New Assignment
            </Link>
          </li>
        }

        { currentUser.isAdmin &&
          <>
            <li className='nav-item'>
              <Link className='nav-link' to={`/assignments/ungraded`}>
                Ungraded Assignments
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to={`/assignments/graded`}>
                Graded Assignments
              </Link>
            </li>
          </>
        }

        <li className='nav-item'>
          <button
            className='btn btn-link'
            onClick={logout}>
              Logout
          </button>
        </li>
        <li className='nav-item'>
          <span className='nav-link'>
            {`Welcome, ${currentUser.first_name} ${currentUser.last_name}!`}
          </span>
        </li>
      </ul>
    </>
  )
}

export default withRouter(AuthenticatedLinks)
