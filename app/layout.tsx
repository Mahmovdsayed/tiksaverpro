import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/Providers/providers";
import Nav from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/react";
const inter = Poppins({ subsets: ["latin"], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], });

export const metadata: Metadata = {
  metadataBase: new URL('https://tiksaverpro.vercel.app'),

  title: "TikTok Video Downloader - Download High-Quality Videos Without Watermark",
  keywords: ['tiksaverpro', 'Download tik tok video', 'tiktok download', 'tiktok', 'dopamine'],
  icons: {
    icon: "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713853708/b9esspm0u8jykxkmrwyb.jpg",
    apple:
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713853708/b9esspm0u8jykxkmrwyb.jpg",
  },
  creator: "Mahmoud Sayed",
  applicationName: "tiksaverpro",

  description:
    "Welcome to our TikTok Video Downloader! Easily download high-quality TikTok videos without any watermark. Simply paste the video link and get your favorite content directly to your device. Enjoy hassle-free downloading!",
  openGraph: {
    images: [
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713852865/coydktlh5tcsxfjbumsp.jpg",
    ],
    title: "TikTok Video Downloader - Download High-Quality Videos Without Watermark",
    description:
      "Welcome to our TikTok Video Downloader! Easily download high-quality TikTok videos without any watermark. Simply paste the video link and get your favorite content directly to your device. Enjoy hassle-free downloading!",
    countryName: "Egypt",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Video Downloader - Download High-Quality Videos Without Watermark",
    description:
      "Welcome to our TikTok Video Downloader! Easily download high-quality TikTok videos without any watermark. Simply paste the video link and get your favorite content directly to your device. Enjoy hassle-free downloading!",
    images: [
      "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713852865/coydktlh5tcsxfjbumsp.jpg",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <Nav />
          {children}
          <SpeedInsights />
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
