export const siteUrl = "https://analdo.me";

export const siteName = "Analdo Gomez";

/**
 * Used for the meta description, Open Graph, and `Person` schema alike, so it
 * stays a factual statement rather than a search-only call to action. Length is
 * deliberately in the 150–160 character range.
 *
 * Kept in sync with the About page's bio by hand — About is the more detailed,
 * authoritative source (specific years, named employers), so when the two
 * diverge, update this one to match About rather than the other way round.
 */
export const siteDescription =
  "Senior Product Designer with 14+ years building B2B software for fintech, retirement, and SaaS — case studies span dispatch, real estate, and security platforms.";

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
 * Each entry is evidenced either by a case study or by the About page's
 * experience/skills sections — kept in sync with both rather than describing
 * only the case-study range.
 */
export const expertise = [
  "B2B product design",
  "Design systems",
  "Fintech and retirement platforms",
  "SaaS platforms",
  "Dispatch and logistics software",
  "Security tooling UX",
  "Accessibility",
];
