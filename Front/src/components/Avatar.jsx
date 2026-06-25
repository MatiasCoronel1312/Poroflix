import React from 'react'
import avatar from "../../public/img.jfif"
export const Avatar = () => {
  return (
    <div className=''>
        <img src={avatar} alt="avatar" className='rounded-full h-15 border-2 border-blue-600'/>
    </div>
  )
}
