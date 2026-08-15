type SocialIconName = "mail" | "linkedin" | "github";

/**
 * Outline social-link glyphs for the homepage sidebar/contact bar — distinct
 * from `ToolIcon`'s brand-colored tool badges. Stroke uses `currentColor` so
 * the surrounding link's text color (and hover/active dimming) drives the
 * icon color instead of a hardcoded fill.
 */
export function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "mail") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-full"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        focusable="false"
      >
        <path d="M22.0008 7.0005L13.0091 12.7269C12.704 12.9041 12.3574 12.9975 12.0045 12.9975C11.6516 12.9975 11.3051 12.9041 10.9999 12.7269L1.9992 7.0005M3.99936 4.0008H20.0006C21.1053 4.0008 22.0008 4.89614 22.0008 6.0006V17.9994C22.0008 19.1039 21.1053 19.9992 20.0006 19.9992H3.99936C2.8947 19.9992 1.9992 19.1039 1.9992 17.9994V6.0006C1.9992 4.89614 2.8947 4.0008 3.99936 4.0008Z" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-full"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        focusable="false"
      >
        <path d="M20.2433 9.75689C19.118 8.63162 17.5917 7.99945 16.0003 7.99945C14.4089 7.99945 12.8826 8.63162 11.7573 9.75689C10.632 10.8822 9.99984 12.4083 9.99984 13.9997V21H14.0002V13.9997C14.0002 13.4692 14.2109 12.9605 14.586 12.5854C14.9611 12.2103 15.4698 11.9996 16.0003 11.9996C16.5308 11.9996 17.0395 12.2103 17.4146 12.5854C17.7897 12.9605 18.0005 13.4692 18.0005 13.9997V21H22.0008V13.9997C22.0008 12.4083 21.3686 10.8822 20.2433 9.75689Z" />
        <path d="M5.99952 8.99949H1.9992V21H5.99952V8.99949Z" />
        <path d="M3.99936 5.99937C5.10402 5.99937 5.99952 5.1039 5.99952 3.99928C5.99952 2.89467 5.10402 1.9992 3.99936 1.9992C2.8947 1.9992 1.9992 2.89467 1.9992 3.99928C1.9992 5.1039 2.8947 5.99937 3.99936 5.99937Z" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="size-full"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      focusable="false"
    >
      <path d="M8.99938 22.0008V18.0005C8.92938 17.3804 8.97938 16.7504 9.14939 16.1503C9.3194 15.5503 9.60942 14.9902 9.99944 14.5002C6.99927 14.5002 3.9991 12.5 3.9991 8.99976C3.91757 7.75245 4.27099 6.51544 4.99916 5.49948C4.69914 4.34939 4.69914 3.14929 4.99916 1.9992C4.99916 1.9992 5.99922 1.9992 7.99933 3.49932C10.6395 2.99928 13.3596 2.99928 15.9998 3.49932C17.9999 1.9992 18.9999 1.9992 18.9999 1.9992C19.28 3.14929 19.28 4.34939 18.9999 5.49948C19.73 6.51956 20.08 7.74966 20 8.99976C20 12.5 16.9998 14.5002 13.9997 14.5002C14.7796 15.4904 15.1388 16.7477 14.9997 18.0005V22.0008M8.99938 18.0005C4.48913 20.0006 3.99931 16.0003 1.9992 16.0003" />
    </svg>
  );
}
