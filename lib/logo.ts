/** Single source of truth for site logo asset + display classes (header, footer, etc.). */
export const siteLogo = {
  src: "/images/logo.png",
  width: 1123,
  height: 449,
} as const;

/** Large nav mark — same in header & footer so branding matches. */
export const siteLogoClassLarge =
  "h-[6.24rem] w-auto max-w-full object-contain object-left transition duration-300 group-hover:opacity-95 sm:h-[7.02rem] lg:h-[9.36rem]";
