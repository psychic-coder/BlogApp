import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'


//navigate is  a componenet
//use Navigate is a hook



function OnlyAdmin() {
  const {currentUser}=useSelector((state)=>state.user)
  return (
    currentUser && currentUser.isAdmin ? <Outlet/>:<Navigate to='/sign-in' />
  )
}

export default OnlyAdmin