'use client'

import { motion } from "framer-motion";
import VideoForm from "./VideoForm";
import Features from "./Features";
import FAQ from "./FAQ";

const Main = () => {

    return <>
        <div className="container mx-auto px-4 py-6 w-full ">
            <div className="flex flex-col items-start justify-center  text-start gap-3">
                <motion.h1
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: .5, ease: "linear" }}
                    style={{
                        background: "linear-gradient(90deg, #ff00a0 0%, RED 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}
                    className="font-semibold text-2xl md:text-4xl text-red-500 ">TikTok Video Downloader - Download High-Quality Videos Without Watermark</motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: .5, ease: "linear" }}
                    // style={{
                    //     background: "linear-gradient(90deg, #FFC0DB 0%, #fff 100%)",
                    //     WebkitBackgroundClip: "text",
                    //     WebkitTextFillColor: "transparent",
                    // }}
                    className="opacity-65 text-xs md:text-base  font-medium leading-5">Welcome to our TikTok Video Downloader! Easily download high-quality TikTok videos without any watermark. Simply paste the video link and get your favorite content directly to your device. Enjoy hassle-free downloading!</motion.p>
                <VideoForm />
                <Features />
            </div>
            <FAQ />
        </div>

    </>;
};

export default Main;