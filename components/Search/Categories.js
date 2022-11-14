import React from 'react'
import Category from './Category'

const Categories = ({categories}) => {
  return (
    <div className='pt-12 px-8 flex flex-col'>
        <div className='mb-4'>
          <h2 className='text-2xl font-bold'>Browse all</h2>
        </div>
        <div className='grid grid-cols-4 gap-6'>
          {categories.map( (category, index) => (
            <Category category={category} key={index}/>
          ))}
        </div>
      </div>
  )
}

export default Categories
