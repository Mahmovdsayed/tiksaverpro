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
    NavbarMenuToggle,
    DropdownItem,
    DropdownTrigger,
    Image,

    Dropdown,
    NavbarMenu,
    NavbarMenuItem,
    DropdownMenu,
    Avatar,
    Link,
} from "@nextui-org/react";

import { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { MoonIcon } from "../../icons/MoonIcon";
import { SunIcon } from "../../icons/SunIcon";
import { Tabs, Tab } from "@nextui-org/react";

export default function Nav() {
    const menuItems = [
        "Profile",
        "Dashboard",
        "Activity",
        "My Settings",
        "Help & Feedback",
        "Log Out",
    ];
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const { slug } = useParams();
    return (
        <>
            <Navbar isBlurred isBordered onMenuOpenChange={setIsMenuOpen} >
                <NavbarContent justify="end">
                    {/* <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            /> */}
                    {/* <NavbarMenu>
              {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                    color={
                      index === 2
                        ? "primary"
                        : index === menuItems.length - 1
                        ? "danger"
                        : "foreground"
                    }
                    className="w-full"
                    href="#"
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
            </NavbarMenu> */}
                    <NavbarBrand>
                        <p
                            onClick={() => router.push(`/`)}
                            className="font-bold text-inherit cursor-pointer"
                        >
                            <Image
                                radius="none"
                                className="w-[200px]"
                                alt="TikSaverPro"
                                src="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713853065/ljdu31w3pwjhgfaywvrg.svg"
                            />

                        </p>
                    </NavbarBrand>
                </NavbarContent>

                <NavbarContent className="hidden mt-1 md:flex" justify="center">
                   
                </NavbarContent>

                <NavbarContent justify="end">
                    <NavbarItem className="space-x-1">
                        <Button
                            isIconOnly
                            size="sm"
                            color="default"
                            onClick={() => setTheme("light")}
                        >
                            <SunIcon />
                        </Button>
                        <Button
                            isIconOnly
                            size="sm"
                            color="default"
                            onClick={() => setTheme("dark")}
                        >
                            <MoonIcon />
                        </Button>
                        {/* <Button
              
              className="md:hidden bg-gradient-to-r from-blue-700 via-blue-800 to-gray-600 text-white font-semibold"
              radius="md"
              as={Link}
              href="/settings"
            >
              <UserIcon /> Log in
            </Button> */}
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            
        </>
    );
}
