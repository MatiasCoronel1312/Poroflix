import React from 'react'

export const Card = ({id,tittle,director,category,description,duration,img}) => {

  return (
    <div className='text-white hover:bg-black w-52 h-52 p-2 rounded-2xl duration-800 hover:cursor-pointer'>
        <div className='h-[50%]'>
            <img src={img} alt="" className='rounded-2xl' />
            
        </div>
        <div className='h-[50%]  flex flex-col text-left pt-3'>
            <div className='flex justify-between'>
                <div className='text-[15px] truncate'>{tittle}</div>
                <div className='text-[12px]'>{duration}</div>
            </div>
            <div className='text-[12px]'>{director}</div>
            <p className='text-[12px] truncate'>{description}</p>
        </div>
    </div>

  )
}
