import React from 'react'
import { Link } from 'react-router-dom'

export default function Settings() {
  return (
    <div className='all settings will be here'>
         <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Settings
      </h1>
      <div className="all_settings">
        <div className="profile py-3 px-2">
          <Link to="/profile">Profile</Link>
          <hr />
        </div>
      </div>
    </div>
  )
}
