import React from 'react'
import CategorySideBar from './_components/CategorySideBar'

const layout = ({children}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 mt-8">
        <div className="md:block hidden"><CategorySideBar/></div>
        <div className="md:col-span-3">{children}</div>
    </div>
  )
}

export default layout