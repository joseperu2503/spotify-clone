import React from 'react'

const Category = ({category}) => {
  return (
    <div className='rounded-lg relative cursor-pointer hover:scale-105 transition-all'>
      <img src={category.icons[0].url} alt="" className='rounded-lg'/>
      <div className='absolute top-[calc(50%_+_40px)] flex justify-center w-full'>
        <span className='text-lg font-medium '>{category.name}</span>
      </div>
    </div>
  )
}

export default Category
