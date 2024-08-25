'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import React, { useEffect, useState } from 'react'
import BookingHistoryList from './_component/BookingHistoryList'
import GlobalApi from '@/app/_services/GlobalApi';
import { useSession } from 'next-auth/react';

const MyBooking = () => {
    const {data} = useSession();
    const [bookingHistory,setBookingHistory] = useState([]);
    useEffect(()=>{
        data&&GetUserBookingHistory();
    },[data]);
    const GetUserBookingHistory=()=>{
        GlobalApi.getUserBookingHistory(data?.user?.email).then(resp=>{
            console.log(resp);
            setBookingHistory(resp.bookings)
        })
    }
    const filterData = (type)=>{
        const result = bookingHistory.filter(item=>type=='booked'?
        new Date(item.date)>new Date():new Date(item.date)<new Date());
        return result
    }
  return (
    <div className="my-10 mx-5 md:mx-14 lg:mx-36">
        <h3 className="my-2 font-bold text-[20px]">My Bookings</h3>
        <Tabs defaultValue="booked" className="w-full">
            <TabsList className="w-full bg-gray-200 justify-start">
                <TabsTrigger value="booked" className="">Booked</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="booked"><BookingHistoryList bookingHistory={filterData('booked')} /></TabsContent>
            <TabsContent value="completed"><BookingHistoryList bookingHistory={filterData('completed')} /></TabsContent>
        </Tabs>
    </div>
  )
}

export default MyBooking