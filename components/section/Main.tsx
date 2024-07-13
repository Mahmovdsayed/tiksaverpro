'use client'
import { Button, Card, CardBody, CardHeader, Divider, Image, Input, Link, button, link } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { useFormik } from "formik";
import * as yup from "yup";
import { Bars } from "react-loader-spinner";
import { usePathname } from 'next/navigation'
import fileSaver from "file-saver";
import toast from "react-hot-toast";
import GetStarted from "./GetStarted";
import { DownloadTiktokVideo } from "@/functions/DownloadTiktokVideo";
import { motion } from "framer-motion";
interface IProps {

}
const MainSection = ({ }: IProps) => {
    const textVariants = {
        hidden: { opacity: 0, x: -200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    const CardTop = {
        hidden: { opacity: 0, y: 100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };
    const toBottom = {
        hidden: { opacity: 0, y: -100 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };
    const text2Variants = {
        hidden: { opacity: 0, x: 200 },
        visible: { opacity: 1, x: 0, transition: { duration: 1 } }
    };
    const [Data, setData] = useState<any>([])
    const [Downloads, setDownloads] = useState<any>([])
    const [value, setValue] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname()

    const pageNumber = searchParams.get("s") ?? "";

    const DownloadVideo = async () => {
        setisLoading(true)
        const data = await DownloadTiktokVideo(value)
        console.log(data)
        setData(data)
        setDownloads(data.medias)
        setisLoading(false)
    }
    const router = useRouter();
    const defaultContent =
        "";
    function handleSubmit(e: any) {
        router.replace(`/?s=${value}`);
        e.preventDefault();
    }
    function onClear() {
        router.replace(`/`);
    }
    const TiktokLink = /^(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com\/(?:@[\w.-]+\/video\/\d+)|(?:vm\.tiktok\.com\/[\w.-]+)|(?:vt\.tiktok\.com\/[\w.-]+))\/?$/;
    let validatScheme = yup.object({
        url: yup
            .string()
            .matches(TiktokLink, "Please enter a valid TikTok video link.")
            .required("TikTok video link is required"),
    });
    let formik = useFormik({
        initialValues: {
            url: "",
        },
        validationSchema: validatScheme,
        onSubmit: DownloadVideo,
    });
    const ButtonSubmit = () => {
        router.replace(`/?s=${value}`)
        DownloadVideo()
    }

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
        <div className="text-center mt-6 px-6">
            <motion.h1 variants={textVariants}
                initial="hidden"
                
                animate="visible" className="my-4 text-2xl font-bold lg:text-6xl capitalize md:uppercase"><span className="font-bold text-pink-600">TikTok Video Downloader</span> - Download High-Quality Videos Without Watermark</motion.h1>
            <motion.p variants={text2Variants}
                initial="hidden"
                animate="visible" className='my-2 line-clamp-6 text-default-600 font-medium text-tiny md:text-medium text-wrap  '>Welcome to our TikTok Video Downloader! Easily download high-quality TikTok videos without any watermark. Simply paste the video link and get your favorite content directly to your device. Enjoy hassle-free downloading!</motion.p>
        </div>
        <Divider className="mt-6 mx-3 w-4/5 md:w-1/2" />
        <motion.div variants={toBottom}
            initial="hidden"
            animate="visible" className="w-full md:w-1/2 px-6 flex mt-4  items-center">
            <form
                className="w-full flex mt-6  items-center"
                onSubmit={handleSubmit}            >
                <Input
                    placeholder={"paste the tiktok video link"}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={value}
                    size="lg"
                    type="text"
                    name="url"
                    id="url"
                    onClear={onClear}
                    onValueChange={setValue}
                    radius="sm"
                    startContent={
                        <BsFillSearchHeartFill className="text-zinc-500" size={16} />
                    }
                />
                {isLoading ?
                    <Button color="danger" size="lg" radius="sm" className="ms-1"><Bars
                        height="20"
                        width="100"
                        color="#fff"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    /></Button> :
                    <Button
                        onClick={() => ButtonSubmit()}
                        isDisabled={!(formik.isValid && formik.dirty)}
                        radius="sm"
                        size="lg"
                        type="submit"
                        isIconOnly
                        startContent={<BsFillSearchHeartFill />}
                        color="danger"
                        className="ms-1"
                    ></Button>

                }

            </form>

        </motion.div>
        {formik.errors.url && formik.touched.url ? (
            <div className="text-tiny mt-2 p-2 text-red-500">
                {formik.errors.url}
            </div>
        ) : (
            ""
        )}
        <motion.div variants={CardTop}
            initial="hidden"
            animate="visible" className="w-full md:w-1/2 px-6 flex mt-4 justify-center items-center">
            <Card className="bg-[#f0f0f0] dark:bg-[#181818]" shadow="none">
                <CardHeader className="text-tiny md:text-md">we only accept links in the following formats</CardHeader>
                <CardBody className="flex flex-col space-y-2 text-tiny text-indigo-400">
                    <span>https://www.tiktok.com/@username/video/1234567890123456789/</span>
                    <span>https://www.tiktok.com/@username/video/1234567890123456789</span>
                    <span>https://vm.tiktok.com/abcdefg/</span>
                    <span>https://vm.tiktok.com/abcdefg</span>
                    <span>https://vt.tiktok.com/abcdefg/</span>
                    <span>https://vt.tiktok.com/abcdefg</span>
                </CardBody>
            </Card>
        </motion.div>


        <div className={Data.length == 0 ? "hidden" : "mt-6 px-6 flex flex-col items-center"}>
            <Image className="h-[300px] w-[300px]" alt={Data.title} isZoomed src={Data.thumbnail} />
            <div className="my-3 text-center">
                <Link color="danger" target="_blank" href={Data.url} className=" font-semibold text-sm md:text-md text-center">{Data.title}</Link>
                <h6 className="text-center font-semibold text-default-600 text-sm md:text-md">{Data.duration}</h6>
                <Divider className="my-2" />
                <h5 className="text-center pt-3 font-semibold text-default-700">Download Now</h5>
                <p className="text-tiny font-semibold py-3 text-center text-default-500 ">Please note that downloading may take some time for larger video files</p>

                <div className={Downloads.length == 0 ? "hidden" : "flex flex-col justify-center items-center space-y-2"}>
                    {Downloads.map((download: any) => <Button onClick={() => saveFile(download.url, download.extension)} key={download.size} color="danger" radius="sm" className="w-full">
                        Download {download.quality} <span className="text-tiny font-medium">{download.formattedSize}</span>
                    </Button>

                    )}



                </div>
            </div>
        </div>
        <Divider className="mt-6 mx-3 w-4/5 md:w-1/2" />
        <GetStarted />
    </>;
};

export default MainSection;
