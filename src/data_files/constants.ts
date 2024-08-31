import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "DigNation SMP",
  tagline: "DigNation SMP, Minecraft as it should be",
  description: "A small yet mighty minecraft server",
  description_short: "A small yet mighty minecraft server",
  url: "https://www.dignation.nz",
  author: "HuskyNZ",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}`,
  description: "DigNation SMP, Minecraft as it should be",
  image: ogImageSrc,
};
