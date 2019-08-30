import React from 'react'

import AuthenticatedLinks from './Navigation.AuthenticatedLinks'
import UnauthenticatedLinks from './Navigation.UnauthenticatedLinks'

export default ({ currentUser, logoutUser }) => (
  <section className='bg-light border-bottom mb-4'>
    <div className='container'>
      { 
        currentUser
        ? <AuthenticatedLinks currentUser={currentUser} logoutUser={logoutUser} /> 
        : <UnauthenticatedLinks /> 
      }
    </div>
  </section>
)
