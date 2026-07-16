import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";
import "./preview.css";

const portfolioViewports = {
  mobile: {
    name: "Mobile 390px",
    styles: { width: "390px", height: "844px" },
    type: "mobile",
  },
  tablet: {
    name: "Tablet 768px",
    styles: { width: "768px", height: "1024px" },
    type: "tablet",
  },
  desktop: {
    name: "Desktop 1440px",
    styles: { width: "1440px", height: "960px" },
    type: "desktop",
  },
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "Portfolio dark",
      values: [
        { name: "Portfolio dark", value: "#121212" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
    viewport: {
      options: portfolioViewports,
    },
  },
  initialGlobals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export default preview;
