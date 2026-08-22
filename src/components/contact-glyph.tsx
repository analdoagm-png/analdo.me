type ContactGlyphName = "mail" | "linkedin" | "github";

/**
 * Homepage-redesign-only icon set — the exact path data exported from the
 * new Figma iteration's `contact-link`/`Frame` nodes (mail, linkedin,
 * github), `fill`/`stroke="white"` swapped for `currentColor` so each glyph
 * dims with its surrounding link text on hover/active, same convention as
 * `ContactIcon` on `main`.
 *
 * Deliberately a separate component from `SocialIcon`: `SocialIcon`'s
 * glyphs are a different, simplified outline set already used by
 * `case-study-editorial-sidebar.tsx`, which is out of scope for this
 * (homepage-only) redesign pass — swapping `SocialIcon`'s paths in place
 * would have changed that page's icons too. Re-export rather than redraw if
 * the design changes; see `main`'s `MobileNav` for the same rule applied to
 * its menu glyph.
 */
export function ContactGlyph({ name }: { name: ContactGlyphName }) {
  if (name === "mail") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className="size-full" focusable="false">
        <path
          d="M12.6667 3.33333H3.33333C2.59695 3.33333 2 3.93029 2 4.66667V11.3333C2 12.0697 2.59695 12.6667 3.33333 12.6667H12.6667C13.403 12.6667 14 12.0697 14 11.3333V4.66667C14 3.93029 13.403 3.33333 12.6667 3.33333Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.66667 4.66667L8 8.66667L13.3333 4.66667"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 16 16" fill="none" className="size-full" focusable="false">
        <path
          d="M4.13375 14H1.23125V4.65312H4.13375V14ZM2.6825 3.43438C2.46176 3.43438 2.24317 3.3909 2.03923 3.30642C1.83529 3.22195 1.64999 3.09813 1.4939 2.94204C1.33781 2.78595 1.21399 2.60065 1.12952 2.3967C1.04504 2.19276 1.00156 1.97418 1.00156 1.75344C1.00156 1.53269 1.04504 1.31411 1.12952 1.11017C1.21399 0.90623 1.33781 0.720925 1.4939 0.564835C1.64999 0.408746 1.83529 0.284929 2.03923 0.200454C2.24317 0.115979 2.46176 0.0725 2.6825 0.0725C3.12831 0.0725 3.55587 0.249598 3.8711 0.564835C4.18634 0.880072 4.36344 1.30763 4.36344 1.75344C4.36344 2.19925 4.18634 2.6268 3.8711 2.94204C3.55587 3.25728 3.12831 3.43438 2.6825 3.43438ZM14.9969 14H12.1006V9.38437C12.1006 8.28437 12.0788 6.86875 10.5663 6.86875C9.03188 6.86875 8.7975 8.06875 8.7975 9.30625V14H5.90375V4.65312H8.68188V5.92812H8.7225C9.11 5.19375 10.0569 4.41875 11.4694 4.41875C14.4069 4.41875 14.9475 6.35313 14.9475 8.86563L14.9969 14Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" fill="none" className="size-full" focusable="false">
      <path
        d="M8 0.198C3.58 0.198 -2.38419e-07 3.78 -2.38419e-07 8.198C-2.38419e-07 11.7333 2.292 14.7313 5.47 15.788C5.87 15.8633 6.01667 15.616 6.01667 15.4033C6.01667 15.2133 6.01 14.71 6.00667 14.0433C3.78133 14.526 3.312 12.97 3.312 12.97C2.948 12.0467 2.422 11.8 2.422 11.8C1.69733 11.304 2.478 11.314 2.478 11.314C3.28133 11.37 3.70333 12.138 3.70333 12.138C4.41667 13.3613 5.576 13.008 6.03333 12.8033C6.10533 12.286 6.31133 11.9333 6.54 11.7333C4.76333 11.5333 2.896 10.8453 2.896 7.78C2.896 6.90667 3.206 6.19333 3.71933 5.63333C3.62933 5.43133 3.35933 4.618 3.78933 3.516C3.78933 3.516 4.45933 3.30133 5.98933 4.336C6.62933 4.158 7.30933 4.07 7.98933 4.066C8.66933 4.07 9.34933 4.158 9.98933 4.336C11.5093 3.30133 12.1793 3.516 12.1793 3.516C12.6093 4.618 12.3393 5.43133 12.2593 5.63333C12.7693 6.19333 13.0793 6.90667 13.0793 7.78C13.0793 10.8533 11.2093 11.53 9.42933 11.7267C9.70933 11.9667 9.96933 12.4573 9.96933 13.2067C9.96933 14.2773 9.95933 15.1373 9.95933 15.3973C9.95933 15.6073 10.0993 15.8573 10.5093 15.7773C13.71 14.728 16 11.728 16 8.198C16 3.78 12.418 0.198 8 0.198Z"
        fill="currentColor"
      />
    </svg>
  );
}
