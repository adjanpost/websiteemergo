import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "EMERGO",
    short_name: "EMERGO",
    description: "Premium buitenverblijven van massief Europees hout",
    start_url: "/",
    display: "standalone",
    background_color: "#1a2e1a",
    theme_color: "#1a2e1a",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
