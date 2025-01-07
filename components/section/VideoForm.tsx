'use client'
import { Alert, Button, ButtonGroup, Card, CardBody, CardHeader, Chip, Image, Input } from "@nextui-org/react";
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

            if (data?.result) {
                setVideoData1(data.result);
                toast.dismiss(toastId);
                toast.success("Video data fetched successfully", {
                    duration: 2500,
                });
            } else if (data?.message) {
                toast.dismiss(toastId);
                toast.error("Error fetching video data", {
                    description: data.message,
                    duration: 5000,
                    closeButton: true,
                });
            } else {
                toast.dismiss(toastId);
                toast.error("Unexpected error occurred", {
                    description: "The server response is not in the expected format.",
                    duration: 5000,
                    closeButton: true,
                });
            }

            console.log(data);
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
        validationSchema,
        onSubmit: async () => {
            await DownloadTiktokVideo(formik.values.url);
            formik.resetForm();
        },
    });

    const saveFile = async (url: string, extension: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Network response was not ok");

            if (!response.body) throw new Error("ReadableStream not yet supported in this browser.");

            const contentLength = response.headers.get('Content-Length');
            if (!contentLength) throw new Error("Content-Length response header missing.");

            const reader = response.body.getReader();
            const total = parseInt(contentLength, 10);

            let receivedLength = 0;
            const chunks = [];
            const toastId = toast.loading("Downloading: 0%");

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                chunks.push(value);
                receivedLength += value.length;

                // Display progress
                const percentage = Math.round((receivedLength / total) * 100);
                toast.loading(`Downloading: ${percentage}%`, { id: toastId });
            }

            toast.dismiss(toastId);
            toast.success("Download complete!");

            const blob = new Blob(chunks);
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = `tiksaverpro.${extension}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error("Error downloading file:", error);
            toast.error("Failed to download the file. Please try again later.");
        }
    };

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
                transition={{ duration: 0.3, delay: 0.6 }}
                className="mt-2 w-full"
            >
                <Card radius="lg" shadow="sm" isPressable className="w-full">
                    <CardHeader className="text-xs font-semibold md:text-sm pb-0">We accept the following links:</CardHeader>
                    <CardBody className="flex flex-col gap-1 text-xs font-medium md:text-sm opacity-85">
                        <div>www.tiktok.com/@user/video/1234567890123456789</div>
                        <div>vm.tiktok.com/abc123/</div>
                        <div>vt.tiktok.com/xyz456</div>
                        <div>tiktok.com/@user/video/1234567890123456789</div>
                    </CardBody>
                </Card>
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
        {VideoData1 && VideoData1.videoSD ? (
            <div className="mt-4 m-auto w-full">
                <div className="flex flex-col items-center w-full justify-center gap-3">
                    <video
                        src={VideoData1?.videoSD}
                        className="w-full md:w-fit h-[500px] rounded-2xl object-cover md:object-contain"
                        controls
                        autoPlay
                        loop
                    >
                        <source src={VideoData1?.videoSD} />
                    </video>
                    <div className="flex items-center justify-center flex-wrap gap-2"></div>
                    <p className="text-center text-xs md:text-sm lg:text-base">
                        {VideoData1?.desc}
                    </p>
                    <div className="flex items-center justify-center flex-col md:flex-row gap-2 mt-4 w-full">
                        <Button
                            onPress={() => saveFile(VideoData1?.videoHD, "mp4")}
                            startContent={<FaDownload />}
                            size="sm"
                            radius="full"
                            className="w-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900 via-amber-900 to-red-900"
                        >
                            Download with HD quality
                        </Button>
                        <Button
                            onPress={() => saveFile(VideoData1?.videoSD, "mp4")}
                            startContent={<FaDownload />}
                            size="sm"
                            radius="full"
                            className="w-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900 via-amber-900 to-red-900"
                        >
                            Download with SD quality
                        </Button>
                        <Button
                            onPress={() => saveFile(VideoData1?.videoWatermark, "mp4")}
                            startContent={<FaDownload />}
                            size="sm"
                            radius="full"
                            className="w-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-rose-900 via-amber-900 to-red-900"
                        >
                            Download with WaterMark
                        </Button>
                    </div>
                </div>
            </div>
        ) : null}

    </>
};

export default VideoForm;
