export const LOCALES = ["en"] as const satisfies [string, ...string[]];
export const DEFAULT_LOCALE = "en" as const satisfies (typeof LOCALES)[number];
