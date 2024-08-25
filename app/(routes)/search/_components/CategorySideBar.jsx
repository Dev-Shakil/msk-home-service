'use client'

import GlobalApi from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const CategorySideBar = () => {
const [categoryList, setCategoryList] = useState([]);
const [paramsCategory, setParamsCategory] = useState('');
const params = usePathname();
  useEffect(()=>{
    getCategoryList();
  },[]
  )
  useEffect(()=>{
    params&&setParamsCategory(params.split("/")[2]);
  },[params]
  );
  const getCategoryList = ()=>{
    GlobalApi.getCategory().then(resp=>{
      setCategoryList(resp.categories)
    })
  }
  return (
    <div>
        <h2 className="font-bold mb-3 text-lg text-primary">Categories</h2>
        {categoryList.map((category,index)=>{
           return <Link href={`/search/${category.name}`} key={index} className={`flex gap-2 p-3 border rounded-lg mb-3 md:mr-10 hover:border-primary hover:bg-purple-50 hover:text-primary hover:shadow-md items-center justify-center ${paramsCategory == category.name?"border-primary text-primary bg-purple-50 shadow-md":""}`}>
                <Image src={category.icon.url} alt={category.name} width={30} height={30}/>
                <h2>{category.name}</h2>
            </Link>
        })}
    </div>
  )
}

export default CategorySideBar