"use client";
import { useParams, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { MdLocalMovies } from "react-icons/md";
import { IoTvSharp, IoSearchSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import {
    Navbar,
    NavbarBrand,
    Button,
    NavbarContent,
    NavbarItem,
    Image,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";

export default function Nav() {


    const router = useRouter();
    const { theme, setTheme } = useTheme();
    return (
        <>
            <Navbar isBlurred >
                <NavbarContent >
                    <NavbarBrand className="items-center justify-center flex">
                        <p
                            onClick={() => router.push(`/`)}
                            className="font-bold text-center text-inherit cursor-pointer"
                        >
                            <Image
                                radius="none"
                                className="w-[120px] md:w-[150px] mx-auto"
                                alt="TikSaverPro"
                                src="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713853065/ljdu31w3pwjhgfaywvrg.svg"
                            />
                        </p>
                    </NavbarBrand>
                </NavbarContent>
            </Navbar>


        </>
    );
}
