'use client'
import React from "react";
import { Image } from "@nextui-org/react";
import { motion } from "framer-motion";

const LoadingScreen = () => {
    return (
        <motion.div
            className="flex items-center justify-center h-screen"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="px-4">
                <Image
                    src="https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713853065/ljdu31w3pwjhgfaywvrg.svg"
                    className="w-[200px] md:w-[400px]"
                />
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
