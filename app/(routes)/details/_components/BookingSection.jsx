"use client"
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import GlobalApi from '@/app/_services/GlobalApi';
import moment from 'moment';
  
const BookingSection = ({children,business}) => {
    const [date,setDate] = useState(new Date());
    const [timeSlot,setTimeSlot] = useState([]);
    const [bookedSlot,setBookedSlot] = useState([]);
    const [selectedTime,setSelectedTime]=useState();
    const {data} = useSession()
    useEffect(()=>{
        getTime();
        setDate();
        setSelectedTime('');
    },[])
    useEffect(()=>{
        date&&BusinessBookedSlot();
    },[date]);
    const BusinessBookedSlot=()=>{
        GlobalApi.BusinessBookedSlot(business.id, moment(date).format('DD-MMM-YYYY')).then(resp=>{
            setBookedSlot(resp.bookings)
        })
    }
    const getTime = () => {
        const timeList = [];
        for(let i=10; i<=12; i++){
            timeList.push({
                time: i + ":00 AM",
            })
            timeList.push({
                time: i + ":30 AM"
            })
        }
        for(let i=1; i<=6; i++){
            timeList.push({
                time: i + ":00 PM"
            })
            timeList.push({
                time: i + ":30 PM"
            })
        }
        setTimeSlot(timeList)
    }
    const submitBooking = ()=>{
        GlobalApi.createNewBooking(business?.id,moment(date).format('DD-MMM-YYYY'),selectedTime,data?.user?.email,data?.user?.name)
        .then(resp=>{
            console.log(resp);
            if(resp){
                setDate();
                setSelectedTime('')
                toast("Service Booked Successfully")
            };
        },(e)=>{
            toast("Error While creating Booking")
        })
    }
    const isSlotBooked = (time) => {
        return bookedSlot.find(item => item.time == time)
    }
  return (
    <div>
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className='bg-white overflow-y-auto'>
                <SheetHeader>
                <SheetTitle>Book a Service</SheetTitle>
                <SheetDescription>
                    Select Date and Time Slot to Book an Appointment
                    <div className="flex flex-col gap-4 items-baseline ">
                        <h2 className="font-bold my-5">Select a Date</h2>
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                        />
                    </div>
                    <h2 className="font-bold my-5">Select Time Slot</h2>
                    <div className='grid grid-cols-3 gap-3 '>
                        {timeSlot.map((item,index)=>{
                            return <Button variant='outiline'
                            disabled={isSlotBooked(item.time)} key={item.time} onClick={()=>setSelectedTime(item.time)} className={` rounded-full hover:text-white border hover:bg-primary p-2 px-3 ${selectedTime==item.time&&'bg-primary text-white'}`} >{item.time}</Button>
                        })}
                    </div>
                </SheetDescription>  
                </SheetHeader>
                <SheetFooter className="mt-5">
                    <SheetClose asChild>
                        <div className="flex gap-5">
                            <Button variant="destructive">Cancel</Button>
                            <Button disabled={!(selectedTime&&date)} onClick={()=>submitBooking()}>Book</Button>
                        </div>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>

    </div>
  )
}

export default BookingSection