import { Calendar, Clock, MapPin, User } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const BookingHistoryList = ({bookingHistory}) => {
   
  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-2">
        {
            bookingHistory.map((booking,index)=>{
                return <div key={index} className="flex gap-4 border rounded-lg p-4 mb-3">
                    <Image src={booking?.businessList?.image[0]?.url} alt="booked image" height={120} width={120} className="rounded-lg object-cover" />
                    <div className="flex flex-col gap-2">
                        <h2 className="font-bold">{booking?.businessList?.name}</h2>
                        <h2 className="flex gap-2 text-primary "><User/> {booking?.businessList?.contactPerson}</h2>
                        <h2 className="flex gap-2 text-gray-500"><MapPin/> {booking?.businessList?.address}</h2>
                        <h2 className="flex gap-2 text-gray-500"><Calendar className="text-primary"/> Service on : <span className="text-black">{booking?.date}</span></h2>
                        <h2 className="flex gap-2 text-gray-500"><Clock className="text-primary"/> Service on : <span className="text-black">{booking?.time}</span></h2>
                    </div>
                </div>
            })
        }
    </div>
  )
}

export default BookingHistoryList