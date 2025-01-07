"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/Layout/LoadingScreen";
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());

    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return <>
        {loading ? <LoadingScreen /> :
            <div>
                <NextUIProvider navigate={router.push}>
                    <NextThemesProvider attribute="class">
                        <QueryClientProvider client={queryClient}>
                            <Toaster richColors position="top-center" />
                            {children}
                        </QueryClientProvider>
                    </NextThemesProvider>
                </NextUIProvider>
            </div>
        }


    </>
}
