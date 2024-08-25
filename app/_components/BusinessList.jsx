import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BusinessList = ({businessList,title}) => {
  return (
    <div className="mt-5">
        <h2 className="font-bold text-[22px]">{title}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 mb-8">
            {
                businessList?.length>0?businessList?.map((business,index)=>{
                    return(
                        <Link href={`/details/${business?.id}`} key={index} className="shadow-md rounded-lg hover:shadow-xl hover:shadow-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                            <Image src={business?.image[0]?.url}
                            alt={business?.name}
                            width={500}
                            height={200}
                            className="h-[150px] md:h-[200px] object-cover rounded-t-lg"/>
                            <div className="flex flex-col items-baseline p-3 gap-1">
                              <h2 className="p-1 text-[12px] text-primary px-2 bg-purple-200 rounded-full">{business?.category.name}</h2>
                              <h2 className="font-bold text-lg">{business.name}</h2>
                              <h2 className="text-primary">{business.contactPerson}</h2>
                              <h2 className="text-gray-500 text-sm">{business.address?.substr(0,30)}...</h2>
                              <Button className="rounded-lg mt-2">Book Now</Button>
                            </div>
                        </Link>
                    )
                }):
                [1,2,3,4,5,6,7,8].map((item,index)=>{
                    return(
                        <div key={index} className="bg-slate-200 h-[300px] w-full animate-pulse rounded-lg">

                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default BusinessList