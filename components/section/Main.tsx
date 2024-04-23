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

interface IProps {

}
const MainSection = ({ }: IProps) => {
    const [Data, setData] = useState<any>([])
    const [Downloads, setDownloads] = useState<any>([])
    const [value, setValue] = useState("");
    const [isLoading, setisLoading] = useState(false);

    const searchParams = useSearchParams();
    const pathname = usePathname()

    const pageNumber = searchParams.get("s") ?? "";
    const DownloadVideo = async () => {
        setisLoading(true)
        try {
            const options = {
                method: "POST",
                headers: {
                    accept: "application/json",
                },

            };
            const data = await fetch(`https://snapdouyin.app/wp-json/aio-dl/video-data/?url=${value}`, options)
            const response = await data.json()
            setData(response)
            console.log(response)
            setDownloads(response.medias)
            setisLoading(false)
        } catch (error: any) {

            toast.error("Sorry, we couldn't find the requested video. Please double-check the link and try again.", { position: 'top-center' })

        }




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
    const TiktokLink = /^(?:https?:\/\/)?(?:www\.)?(?:tiktok\.com\/(?:@[\w.-]+\/video\/\d+)|(?:vm\.tiktok\.com\/[\w.-]+))\/?$/;
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
    const saveFile = (url: any) => {
        fileSaver.saveAs(
            url,
            `tiksaverpro`
        );
        toast.success("Please wait a moment while your download completes", { duration: 2000 })
    }
    return <>
        <div className="text-center mt-6 px-6">
            <h1 className="text-xl lg:text-2xl  font-medium"><span className="font-bold text-pink-600">TikTok Video Downloader</span> - Download High-Quality Videos Without Watermark</h1>
            <p className="mt-3 lg:w-1/2 m-auto text-default-500 text-sm md:text-md lg:text-lg">Welcome to our TikTok Video Downloader! Easily download high-quality TikTok videos without any watermark. Simply paste the video link and get your favorite content directly to your device. Enjoy hassle-free downloading!</p>
        </div>
        <Divider className="mt-6 mx-3 w-4/5 md:w-1/2" />
        <div className="w-full md:w-1/2 px-6 flex mt-4  items-center">
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

        </div>
        {formik.errors.url && formik.touched.url ? (
            <div className="text-tiny mt-2 p-2 text-red-500">
                {formik.errors.url}
            </div>
        ) : (
            ""
        )}
        <div className="w-full md:w-1/2 px-6 flex mt-4 justify-center items-center">
            <Card className="bg-gray-200 dark:bg-[#18181B]" shadow="none">
                <CardHeader className="text-tiny md:text-md">we only accept links in the following formats</CardHeader>
                <CardBody className="flex flex-col space-y-2 text-tiny text-indigo-400">
                    <span>https://www.tiktok.com/@username/video/1234567890123456789/</span>
                    <span>https://www.tiktok.com/@username/video/1234567890123456789</span>
                    <span>https://vm.tiktok.com/abcdefg/</span>
                    <span>https://vm.tiktok.com/abcdefg</span>
                </CardBody>
            </Card>
        </div>
       

        <div className={Data.length == 0 ? "hidden" : "mt-6 px-6 flex flex-col items-center"}>
            <Image className="h-[300px] w-[300px]" alt={Data.title} isZoomed src={Data.thumbnail} />
            <div className="my-3 text-center">
                <Link color="danger" target="_blank" href={Data.url} className=" font-semibold text-sm md:text-md text-center">{Data.title}</Link>
                <h6 className="text-center font-semibold text-default-600 text-sm md:text-md">{Data.duration}</h6>
                <Divider className="my-2" />
                <h5 className="text-center pt-3 font-semibold text-default-700">Download Now</h5>
                <p className="text-tiny font-semibold py-3 text-center text-default-500 ">Please note that downloading may take some time for larger video files</p>

                <div className={Downloads.length == 0 ? "hidden" : "flex flex-col justify-center items-center space-y-2"}>
                    {Downloads.map((download: any) => <Button onClick={() => saveFile(download.url)} key={download.size} color="danger" radius="sm" className="w-full">
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