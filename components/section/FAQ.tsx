'use client'

import { Accordion, AccordionItem, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";

const FAQ = () => {
    const faq = [
        { title: "Q1: Is it free to use this TikTok video downloader?", description: "Yes, our downloader is 100% free to use with no hidden charges or premium plans." },
        { title: "Q2: Can I download TikTok videos without a watermark?", description: "Yes, our tool allows you to download videos without the TikTok watermark." },
        { title: "Q3: Do I need to register to download videos?", description: "No, you can use our downloader without creating an account or providing any personal information." },
        { title: "Q4: What file formats are supported for downloads?", description: "Currently, we support MP4 for videos and MP3 for audio extraction." },
        { title: "Q5: Can I download private videos from TikTok?", description: "No, our downloader only supports publicly available TikTok videos." },
        { title: "Q6: Is there a limit on the number of videos I can download?", description: "No, you can download as many TikTok videos as you like, without limits." },
        { title: "Q7: Are downloaded videos stored on your servers?", description: "No, we do not store any downloaded videos or user data on our servers." },
        { title: "Q8: Does this work on mobile devices?", description: "Yes, our downloader works seamlessly on mobile devices, tablets, and desktops." },
        { title: "Q9: How do I use the downloader?", description: "Simply paste the TikTok video URL into the input field, click “Download,” and choose your desired format." },
        { title: "Q10: Are all TikTok videos supported?", description: "Most public videos are supported. However, if a video is private, restricted, or removed by the uploader, it may not be available for download." },
        { title: "Q11: Can I share downloaded videos directly on social media?", description: "Yes, once downloaded, you can easily share videos on any platform like Instagram, Facebook, or WhatsApp." },
        { title: "Q12: Is there a risk of violating TikTok's terms of use?", description: "Downloading videos should comply with TikTok's terms and copyright laws. Make sure you have the creator's permission before sharing or using the content commercially." },
    ]

    return <>
        <Divider />
        <div className="my-6">
            <motion.h3
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: .5, ease: "linear" }}
              
                className="text-xl md:text-2xl font-semibold mb-6  text-start w-fit">Frequently Asked Questions (FAQ)</motion.h3>
            <motion.div
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.3, ease: "linear" }}
                className="mb-4">
                <Accordion selectionMode="single">
                    {faq.map((fa: any, index: number) =>

                        <AccordionItem
                            key={index}
                            aria-label={fa.title}
                            title={fa.title}>
                            <div className="font-medium text-sm opacity-85 text-pink-400">
                                {fa.description}
                            </div>
                        </AccordionItem>
                    )}
                </Accordion>
            </motion.div>
        </div>
    </>;
};

export default FAQ;