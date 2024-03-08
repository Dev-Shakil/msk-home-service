'use client'
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import BusinessInfo from '../_components/BusinessInfo';
import Image from 'next/image';

const BusinessDetail = ({params}) => {
    const [businessList,setBusinessList] = useState({});
    const {data , status} = useSession();
    
    
    useEffect(()=>{
        // setCategoryParams(params.category);
        params && getBusinessById();
    },[params]);
    const getBusinessById = ()=>{
        GlobalApi.getBusinessById(params.businessId).
        then(resp=>{
            setBusinessList(resp?.businessList);
        })
    }
    useEffect(()=>{
        checkUserAuth();
    },[]);
    const checkUserAuth = () => {
        if(status == 'loading'){
            return <p>Loading...</p>
        }
        if(status == 'unauthenticated'){
            signIn('descope')
        }
    }
    console.log(businessList)
  return status=="authenticated" && businessList && (<div className="py-5">
    {/* <BusinessInfo business={businessList}/> */}
    <h3>{businessList?.name}</h3>
    <Image src={businessList?.image?.[0].url} alt={businessList?.name} className="rounded-full h-[150px] object-cover" width={150} height={200} />
  </div>
  )
}

export default BusinessDetail