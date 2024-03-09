'use client'
import GlobalApi from '@/app/_services/GlobalApi';
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import BusinessInfo from '../_components/BusinessInfo';
import Image from 'next/image';
import { Mail, MapPin } from 'lucide-react';
import SuggestedBusinessList from '../_components/SuggestedBusinessList';
import BusinessDescription from '../_components/BusinessDescription';

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
  return status=="authenticated" && businessList && (<div className="py-8 md:py-15 px-10 md:px-20">
    <BusinessInfo business={businessList}/>
    <div className="grid grid-cols-3 mt-16">
        <div className="col-span-3 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={businessList} />
        </div>
        <div className="w-full">
            <SuggestedBusinessList business={businessList}/>
        </div>
    </div>
   
  </div>
  )
}

export default BusinessDetail