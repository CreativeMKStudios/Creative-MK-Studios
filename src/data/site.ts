import { siteUrl } from "../../site.config.mjs";

export const site = {
  url: siteUrl,
  name: "Creative MK Studios",
  shortName: "CreativeMKStudios",
  email: "creativemkstudios@gmail.com",
  founder: "George Childs Gatty",
  jobTitle: "Web designer",
  rate: 25,
  area: "Milton Keynes and Bedfordshire",
} as const;

export function absolute(path: string) {
  if (path === "/") return site.url;
  return new URL(path, site.url).href;
}

export function money(amount: number) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function monthly(pages: number) {
  return site.rate * pages;
}

export function yearly(pages: number) {
  return site.rate * pages * 12;
}

export const pricingFaqs = [
  {
    q: "Do I pay a build fee before we start?",
    a: "No. You pay for the year, and that payment covers the design and the build.",
  },
  {
    q: "When do I pay?",
    a: "You pay for 12 months at the start. We then build the site and put it online.",
  },
  {
    q: "What is a small change?",
    a: "A wording change, a photo swap, a price update, or a change to your hours or contact details.",
  },
  {
    q: "What if I need a new page later?",
    a: "We add it. Your page count goes up, and so does the yearly price.",
  },
  {
    q: "Do you guarantee first place on Google?",
    a: "No. No one honest can promise that. We set the site up so Google can read who you are, what you do, and where you work.",
  },
  {
    q: "Do you only work in Milton Keynes and Bedfordshire?",
    a: "That is the area we focus on. If you are just outside it, email us and ask.",
  },
] as const;

type Crumb = { name: string; path: string };

export function graph(extra: Record<string, unknown>[] = []) {
  const orgId = `${site.url}/#studio`;
  const personId = `${site.url}/#george`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: site.name,
        alternateName: site.shortName,
        description:
          "Web design for small businesses in Milton Keynes and Bedfordshire.",
        publisher: { "@id": orgId },
        inLanguage: "en-GB",
      },
      {
        "@type": "ProfessionalService",
        "@id": orgId,
        name: site.name,
        alternateName: site.shortName,
        url: site.url,
        image: absolute("/og.png"),
        email: site.email,
        description:
          "George Childs Gatty builds websites for small businesses in Milton Keynes and Bedfordshire. The price is a monthly rate per page, paid once a year. There is no separate build fee.",
        priceRange: "£25 per page per month",
        currenciesAccepted: "GBP",
        founder: { "@id": personId },
        areaServed: [
          {
            "@type": "City",
            name: "Milton Keynes",
            containedInPlace: {
              "@type": "AdministrativeArea",
              name: "Buckinghamshire",
            },
          },
          { "@type": "AdministrativeArea", name: "Bedfordshire" },
          { "@type": "City", name: "Bedford" },
          { "@type": "City", name: "Luton" },
          { "@type": "City", name: "Leighton Buzzard" },
        ],
        knowsAbout: [
          "Web design",
          "Local SEO",
          "Small business websites",
          "Milton Keynes",
          "Bedfordshire",
        ],
        makesOffer: {
          "@type": "Offer",
          name: "Website plan",
          url: absolute("/pricing"),
          availability: "https://schema.org/InStock",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: site.rate * 12,
            priceCurrency: "GBP",
            unitText: "per page, billed once a year",
            billingDuration: "P1Y",
          },
          description:
            "Design, build, hosting, and small edits. £25 per page per month, paid once a year. No separate build fee.",
        },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.founder,
        jobTitle: site.jobTitle,
        email: `mailto:${site.email}`,
        url: absolute("/about"),
        worksFor: { "@id": orgId },
        homeLocation: {
          "@type": "Place",
          name: "Milton Keynes and Bedfordshire",
        },
      },
      ...extra,
    ],
  };
}

export function breadcrumb(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absolute(crumb.path),
    })),
  };
}

export function faqGraph() {
  return {
    "@type": "FAQPage",
    mainEntity: pricingFaqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serializeLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
