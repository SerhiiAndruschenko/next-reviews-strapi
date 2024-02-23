/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "https://next-reviews-strapi.onrender.com/",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    // Customize the rules for robots.txt
    policies: [
      {
        userAgent: "*", // This applies to all web crawlers
        disallow: ["/"], // Disallow indexing of all pages
      },
    ],
  },
};
