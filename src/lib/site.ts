export const siteUrl = "https://analdo.me";

export const siteName = "Analdo Gomez";

/**
 * Used for the meta description, Open Graph, and `Person` schema alike, so it
 * stays a factual statement rather than a search-only call to action. Length is
 * deliberately in the 150–160 character range.
 */
export const siteDescription =
  "Over a decade of solving complex B2B problems with clear thinking, fewer steps, and better outcomes — dispatch, real estate, enterprise, security platforms.";

/** Title for `/`, kept in the 50–60 character range. */
export const siteTitle =
  "Analdo Gomez / Senior Product Designer for B2B Software";

/**
 * Appended to every child route's title. Case-study titles therefore must not
 * repeat the name themselves.
 */
export const titleTemplate = "%s | Analdo Gomez";

export const author = {
  name: "Analdo Gomez",
  jobTitle: "Senior Product Designer",
  email: "analdoagm@gmail.com",
  linkedIn: "https://www.linkedin.com/in/analdo-gomez-17768a3b",
  github: "https://github.com/analdoagm-png",
  country: "Colombia",
} as const;

/** `sameAs` targets for `Person` schema. Add every profile that is genuinely his. */
export const profiles = [author.linkedIn, author.github];

/**
 * Specialisations declared to search and AI engines through `Person` schema.
 * Each entry is evidenced by a case study on the site.
 */
export const expertise = [
  "B2B product design",
  "Enterprise UX",
  "Dispatch and logistics software",
  "Design systems",
  "Security tooling UX",
];
