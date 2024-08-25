import Image from 'next/image'
import React from 'react'

const BusinessDescription = ({business}) => {
  return (
    <div>
        <h2 className="font-bold text-[25px]" >Description</h2>
        <p className="text-lg text-gray-600 mt-4" >{business?.about}</p>
        <h2 className="font-bold text-[25px] mt-8">Gellary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5">
            {business?.image?.map((item,index)=>{
                return <Image src={item?.url} key={index}
                    alt={"image" + index}
                    width={700}
                    height={200}
                    className="rounded-lg max-h-[100px]" />
            })}
        </div>
    </div>
  )
}

export default BusinessDescription