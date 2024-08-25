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
import Link from "next/link";

const Header = () => {
  const { data } = useSession();
  useEffect(() => {
  }, [data]);
  return (
    <div className="flex shadow-sm md:p-4 p-1 items-center justify-between">
      <div className="flex items-center gap-8 ">
      <Link href={"/"}><Image src={"/logo.svg"} alt="logo" width={180} height={100} /></Link>
        <div class="md:flex hidden gap-6 items-center">
          <Link href={"/"} className="hover:scale-105 hover:text-primary cursor-pointer">
            Home
          </Link>
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
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Link href="/mybooking">My Booking</Link></DropdownMenuItem>
              <DropdownMenuItem onClick={()=>signOut()}>Logout</DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => signIn()}>Login/Register</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
