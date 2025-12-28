import React from 'react'

const RightCard = ({img,desc}) => {
  return (
     <div className='flex justify-center'>
    <div className='flex flex-col-reverse lg:flex-row justify-center items-center w-5/6 md:w-3/4 gap-6'>
        <div>
            <p className='text-small text-justify dark:text-primary-color'>{desc}</p>
        </div>
        <div>
            <img src={img} alt="Card-1" className="h-38 md:w-96  md:h-36"/>
        </div>
    </div>
    </div>
  )
}

export default RightCard