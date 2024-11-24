import React from 'react'
import PostIssue from '../../components/PostIssue'

const UserDashboard = () => {
  return (
    <div className='text-center'>
        <h2 className='text-black font-bold text-xl md:text-2xl lg:text-3xl mt-4'>User Dashboard</h2>
        <PostIssue />
    </div>

  )
}

export default UserDashboard