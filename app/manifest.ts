import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TikTok Video Downloader - Download High-Quality Videos Without Watermark',
    short_name: 'TikSaverPro App',
    description: 'Welcome to our TikTok Video Downloader! Easily download high-quality TikTok videos without any watermark. Simply paste the video link and get your favorite content directly to your device. Enjoy hassle-free downloading!',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#181818',
    icons: [
      {
        src: 'https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713853708/b9esspm0u8jykxkmrwyb.jpg',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}