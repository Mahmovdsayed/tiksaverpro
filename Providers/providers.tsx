"use client";
import { NextUIProvider, Button } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster } from "react-hot-toast";
import { Offline, Online } from "react-detect-offline";
import { MdOutlineWifiOff } from "react-icons/md";
import LoadingScreen from "@/components/Layout/LoadingScreen";
import { VideoInfo } from "@/functions/VideoInfo";

export function Providers({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    return <>
        {loading == true ? <LoadingScreen /> :
            <div>
                <NextUIProvider navigate={router.push}>
                    <NextThemesProvider attribute="class">
                        <Toaster position="top-center" />
                        {children}
                    </NextThemesProvider>
                </NextUIProvider>
            </div>
        }


    </>
}