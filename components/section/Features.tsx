'use client';

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { motion } from "framer-motion";

const Features = () => {
    const features = [
        {
            title: "High-Quality Video Downloads",
            description: "Download videos in the highest available quality (e.g., 1080p, 4K)."
        },
        {
            title: "Privacy Focused",
            description: "No account registration or personal information is required for downloading."
        },
        {
            title: "Fast and Free",
            description: "Unlimited downloads without any hidden charges."
        },
    ];

    const cardAnimation = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <>
            <Divider />
            <div className="my-3">
                <motion.h3
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: .5, ease: "linear" }}
                    className="text-xl md:text-2xl font-semibold mb-6 text-start w-fit"
                >
                    Features
                </motion.h3>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    transition={{ staggerChildren: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full"
                >
                    {features.map((ft, index) => (
                        <motion.div
                            key={index}
                            variants={cardAnimation}
                            transition={{ duration: 0.5 }}
                            className=""
                        >
                            <Card shadow="none" className="w-full h-full" radius="lg" isPressable>
                                <CardHeader className="text-xs font-semibold md:text-sm pb-0">
                                    {ft.title}
                                </CardHeader>
                                <CardBody className="text-xs font-medium md:text-sm opacity-85">
                                    {ft.description}
                                </CardBody>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </>
    );
};

export default Features;
