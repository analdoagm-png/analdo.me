import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteFooter } from "./site-footer";

function FooterStoryLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-dark-primary">
      <main id="main-content" className="flex-1" />
      <SiteFooter />
    </div>
  );
}

const meta = {
  title: "Components/Site Footer",
  component: SiteFooter,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The footer centers its copyright and links on mobile, then changes to the portfolio's horizontal left/right layout from the tablet breakpoint onward.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <FooterStoryLayout />,
};

export const Mobile: Story = {
  render: () => <FooterStoryLayout />,
  globals: { viewport: { value: "mobile", isRotated: false } },
};

export const Tablet: Story = {
  render: () => <FooterStoryLayout />,
  globals: { viewport: { value: "tablet", isRotated: false } },
};

export const Desktop: Story = {
  render: () => <FooterStoryLayout />,
  globals: { viewport: { value: "desktop", isRotated: false } },
};
