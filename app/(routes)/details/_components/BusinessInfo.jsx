import { Button } from '@/components/ui/button'
import { Mail, MapPin, Share, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const BusinessInfo = ({business}) => {
  return ( business?.name && <div className="md:flex items-center gap-4">
    <Image src={business?.image?.[0].url} alt={business?.name} className="rounded-full h-[150px] object-cover" width={150} height={200} />
    <div className="flex justify-between items-center w-full">
      <div className="flex flex-col items-baseline gap-3 mt-4 md:mt-0">
          <h2 className="rounded-full text-primary bg-purple-100 p-1 px-3">{business.category.name}</h2>
          <h2 className="text-[40px] font-bold ">{business.name}</h2>
          <h2 className="flex gap-2 text-lg text-gray-500"><MapPin/> {business?.address}</h2>
          <h2 className="flex gap-2 text-lg text-gray-500"><Mail/>{business?.email}</h2>
      </div>
      <div className="flex flex-col gap-5 items-end">
          <Button><Share/></Button>
          <h2 className="flex gap-2 text-xl text-primary"><User/> {business?.contactPerson}</h2>
          <h2 className="flex gap-2 text-xl text-gray-500"><User/> Available 8:00 AM to 10:00 PM</h2>
      </div>
    </div>
</div>
  )
}

export default BusinessInfo