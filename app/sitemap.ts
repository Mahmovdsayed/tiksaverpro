import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://tiksaverpro.vercel.app",
      lastModified: new Date(),
      changeFrequency: "yearly",
      images: [
        "https://res.cloudinary.com/dxvpvtcbg/image/upload/v1713852865/coydktlh5tcsxfjbumsp.jpg",
      ],
      alternates: {
        languages: {
          "en-US": "https://tiksaverpro.vercel.app",
        },
      },
      priority: 1,
    },
  ];
}
