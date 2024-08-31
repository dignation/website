// An array of links for navigation bar
const navBarLinks = [
  { name: "Home", url: "/" },
  { name: "Contact", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  {
    section: "Docs",
    links: [
      { name: "Documentation", url: "/welcome-to-docs/" },
    ],
  },
  {
    section: "Discord and blog",
    links: [
      { name: "Blog", url: "/blog" },
      { name: "Discord", url: "https://discord.gg/TH2pbDke2E" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  github: "https://github.com/dignation/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};