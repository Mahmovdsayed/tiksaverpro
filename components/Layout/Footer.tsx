"use client";
interface IProps {}
import { Button, Image, Link } from "@nextui-org/react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";
import { BsThreads } from "react-icons/bs";

const Footer = ({}: IProps) => {
  return (
    <>
      <div className="p-6 mt-6 shadow bg-gray-200 dark:text-white dark:bg-[#181818] backdrop-blur-lg">
        <div className="flex  flex-col md:flex-row justify-center md:justify-between items-center">
          <div className="space-x-2 mb-2 md:mb-0">
            <Button
              href={`https://www.facebook.com/Dipolna`}
              size="sm"
              radius="sm"
              target="_black"
              isIconOnly
              color="default"
              as={Link}
            >
              <FaFacebookF />
            </Button>
            <Button
              href={`https://www.instagram.com/dopamine.app`}
              size="sm"
              radius="sm"
              isIconOnly
              as={Link}
              target="_black"
              color="default"
            >
              <FaInstagram />
            </Button>
            <Button
              href={`https://twitter.com/depolna`}
              size="sm"
              radius="sm"
              isIconOnly
              as={Link}
              color="default"
              target="_black"
            >
              <FaXTwitter />
            </Button>
            <Button
              href={`https://www.tiktok.com/@depolna`}
              size="sm"
              radius="sm"
              isIconOnly
              target="_black"
              as={Link}
              color="default"
            >
              <FaTiktok />
            </Button>
          </div>

          <div className="mt-2 md:mt-0">
            <h3 className="text-sm font-light md:text">
              © 2024{" "}
              <span
               
                className="font-bold cursor-pointer"
              >
                <span
                            
                            className="font-bold text-inherit cursor-pointer"
                        >
                           TikSaver<span className="text-bold text-pink-500">Pro</span>
                        </span>
              </span>
              , All rights reserved.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;