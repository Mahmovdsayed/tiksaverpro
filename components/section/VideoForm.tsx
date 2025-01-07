'use client'
import { Alert, Button, Chip, Image, Input } from "@nextui-org/react";
import { RiSearchEyeLine } from "react-icons/ri";
import { FaDownload } from "react-icons/fa6";
import React, { memo, useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import { motion } from "framer-motion";
import * as Yup from 'yup';
import { useFormik } from "formik";
import { AxiosResponse } from "axios";


const VideoForm = () => {
    const [VideoData1, setVideoData1] = useState<any>([])
    const [VideoData2, setVideoData2] = useState<any>([])

    const TiktokLinkRegex = /^(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com\/(?:@[\w.-]+\/video\/\d+)|(?:vm\.tiktok\.com\/[\w.-]+)|(?:vt\.tiktok\.com\/[\w.-]+))\/?$/;
    const validationSchema = Yup.object({
        url: Yup.string()
            .matches(TiktokLinkRegex, 'Please enter a valid TikTok video URL')
            .required("TikTok video link is required"),
    });

    const DownloadTiktokVideo = async (url: string) => {
        const toastId = toast.loading("Fetching video data...", {
            description: "Please wait while we process your request.",
            duration: Infinity,
        });

        try {
            const { data }: AxiosResponse<any> = await api.post("/api/download", { url });
            if (data?.data?.status === "success") {
                setVideoData1(data?.data)
                setVideoData2(data?.dataV2)
                toast.dismiss(toastId);
                toast.success("Video data fetched successfully", {
                    duration: 2500,
                });
            } else {
                toast.dismiss(toastId);
                toast.error("Error fetching video data", {
                    description: `${data?.data?.message || "An unknown error occurred."}`,
                    duration: 5000,
                    closeButton: true,
                });
            }
            console.log(data)
            return data;
        } catch (error) {
            toast.dismiss(toastId);
            toast.error("Failed to fetch video data", {
                description: "Please check your internet connection and try again.",
                duration: 5000,
                closeButton: true,
            });
            throw error;
        }
    };

    const formik = useFormik({
        initialValues: { url: "" },
        // validationSchema,
        onSubmit: async () => {
            await DownloadTiktokVideo(formik.values.url);
            formik.resetForm();
        },
    });

    return <>

        <motion.form
            onSubmit={formik.handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
            >
                <Input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.url}
                    type="text"
                    variant="underlined"
                    radius="full"
                    errorMessage="Please Enter a Valid TikTok Video URL"
                    label="TikTok Video URL"
                    name="url"
                    isRequired
                    size="md"
                    placeholder="Enter TikTok Video URL"
                    startContent={<RiSearchEyeLine />}
                />
                {formik.touched.url && formik.errors.url ? (
                    <div className="mt-2 font-sharpSansMedium">
                        <Alert
                            color="warning"
                            title={typeof formik.errors.url === 'string' ? formik.errors.url : undefined}
                        />
                    </div>
                ) : ""}
            </motion.div>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.8 }}
            >
                <Button
                    radius="full"
                    startContent={<FaDownload />}
                    className="w-full mt-2 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900 via-amber-900 to-red-900"
                    type="submit"
                    color="danger"
                    isDisabled={!formik.isValid || !formik.values.url || formik.isSubmitting}
                    isLoading={formik.isSubmitting}
                >
                    Download
                </Button>
            </motion.div>
        </motion.form >
        <div className="mt-4 m-auto w-full">
            <div className="flex flex-col items-center w-full justify-center gap-3">
                <video
                    src={VideoData1?.result?.video?.playAddr[0]}
                    className="md:w-1/2 h-4/5 object-contain"
                    controls
                    autoPlay
                    loop
                >
                    <source src={VideoData1?.result?.video?.downloadAddr[0]} />
                </video>
                <div className="flex items-center justify-center flex-wrap gap-2"></div>
                <p className="text-center text-xs md:text-sm lg:text-base">
                    {VideoData1?.result?.description}
                </p>
                <div className="flex items-center justify-center flex-wrap gap-2">
                    {VideoData1?.result?.hashtag.map((ha: any, index: number) =>
                        <Chip key={index} size="sm" radius="sm" color="danger">{ha}</Chip>
                    )}
                </div>
            </div>
        </div>
    </>
};

export default VideoForm;
