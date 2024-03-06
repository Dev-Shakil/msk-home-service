"use client";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { data } = useSession();
  useEffect(() => {
    console.log(data?.user?.name);
  }, [data]);
  return (
    <div className="flex shadow-sm p-5 items-center justify-between">
      <div className="flex items-center gap-8 ">
        <Image src={"/logo.svg"} alt="logo" width={180} height={100} />
        <div class="md:flex hidden gap-6 items-center">
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            Home
          </h2>
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            About
          </h2>
          <h2 className="hover:scale-105 hover:text-primary cursor-pointer">
            Services
          </h2>
        </div>
      </div>
      <div>
        {data?.user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asClild className="flex items-center gap-3">
              <Image
                src={data?.user?.image}
                alt="user"
                width={40}
                height={40}
                className="rounded-full"
              /><div className="flex flex-col text-start"><h3 className="font-bold text-lg">{data?.user?.name}</h3><p>{data?.user?.email}</p></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>My Booking</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn("descope")}>Login/Register</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
