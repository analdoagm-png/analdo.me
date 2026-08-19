type ContactIconName = "mail" | "linkedin" | "github";

/**
 * Decorative icons for the mailto/LinkedIn/GitHub contact links, shared
 * between the homepage hero and `SiteFooter`. Unlike `ToolIcon` (fixed
 * brand colors for chips that never change tone), every icon here uses
 * `currentColor` so it dims in lockstep with the surrounding link text on
 * hover/active instead of staying a flat fixed color.
 *
 * All three are solid glyphs. The envelope used to be a 2px outline mark,
 * which read visibly lighter than the two filled brand marks beside it at the
 * 16px these render at.
 */
export function ContactIcon({ name }: { name: ContactIconName }) {
  if (name === "mail") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" focusable="false">
        <path d="M2.25 6.75A2.25 2.25 0 0 1 4.5 4.5h15a2.25 2.25 0 0 1 2.25 2.25v.32l-9.75 5.42-9.75-5.42v-.32Zm0 2.53v7.97A2.25 2.25 0 0 0 4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V9.28l-9.386 5.216a.75.75 0 0 1-.728 0L2.25 9.28Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 448 512" fill="currentColor" className="size-full" focusable="false">
        <path d="M100.28 448H7.4V148.9h92.88zm-46.44-338.1a53.79 53.79 0 1 1 0-107.58 53.79 53.79 0 0 1 0 107.58zM447.9 448h-92.68V300.3c0-35.2-.7-80.5-49.1-80.5-49.1 0-56.6 38.4-56.6 78v150.2h-92.6V148.9h88.9v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" focusable="false">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}
