'use server'
import toast from "react-hot-toast";

export const DownloadTiktokVideo = async (value: string) => {
  try {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
      },
    };
    const data = await fetch(
      `https://snapdouyin.app/wp-json/aio-dl/video-data/?url=${value}`,
      options
    );
    const response = await data.json();
    return response;
  } catch (error: any) {
    toast.error(
      "Sorry, we couldn't find the requested video. Please double-check the link and try again.",
      { position: "top-center" }
    );
  }
};
