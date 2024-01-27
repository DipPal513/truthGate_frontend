import React from 'react'

export default function User({user}) {
    const {username} = user;
  return (
    <div className='single_user mb-2 px-3 py-5 flex items-center gap-x-3 bg-gray-100 mx-4 rounded'>
        <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
        <div className="info">
            <div className="name font-bold">{username}</div>
        </div>
        
    </div>
  )
}
