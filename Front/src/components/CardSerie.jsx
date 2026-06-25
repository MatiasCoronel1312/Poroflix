import { Link } from "react-router-dom";

export const CardSerie = ({id,title,category, description,img}) => {

  return (
    <Link to= {`/serie/${id}`}> 
    <div className='text-white hover:bg-black w-full  p-2 rounded-2xl duration-800 hover:cursor-pointer mx-auto'>
        <div className='h-[50%]'>
            <img src={img} alt="" className='rounded-2xl ' />
            
        </div>
        <div className='h-[50%] mt-1 flex flex-col text-left pt-3'>
            <div className='flex justify-between'>
                <div className='text-[15px]  truncate'>{title}</div>
                
            </div>
            <div className='text-[12px]'>{category}</div>
            <p className='text-[12px] line-clamp-1'>{description}</p>
        </div>
    </div>
    </Link>
  

  )
}