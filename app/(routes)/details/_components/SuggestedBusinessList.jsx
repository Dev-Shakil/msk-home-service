import GlobalApi from '@/app/_services/GlobalApi';
import { Button } from '@/components/ui/button'
import { NotebookPen } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import BookingSection from './BookingSection';

const SuggestedBusinessList = ({business}) => {
    const [businessList,setBusinessList] = useState([]);
    useEffect(()=>{
        // setCategoryParams(params.category);
        business && getBusinessListByCategory();
    },[business]);
    const getBusinessListByCategory = ()=>{
        GlobalApi.getBusinessByCategory(business?.category?.name).
        then(resp=>{
            setBusinessList(resp?.businessLists);
        })
    }
  return (
    <div className="md:pl-10 ">
        <BookingSection business={business}>
            <Button className="flex gap-2 w-full">
            <NotebookPen/>
            Book Appointment
            </Button>
        </BookingSection>
        
        <h2 className="font-bold text-lg my-3">Similar Business</h2>
        <div className="hidden md:block">
        {businessList&&businessList.map((business,index)=>{
            return <div className="flex gap-2 mb-4 hover:border border-primary p-2 cursor-pointer rounded-lg w-full" key={index}>
                <Image src={business?.image?.[0].url}
                    alt={business?.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"/>
                    <div>
                        <h2 className="font-bold">{business?.name}</h2>
                        <h2 className="text-primary">{business?.contactPerson}</h2>
                        <h2 className="text-gray-400">{business?.address}</h2>
                    </div>
            </div>
        })}
        </div>
    </div>
  )
}

export default SuggestedBusinessList