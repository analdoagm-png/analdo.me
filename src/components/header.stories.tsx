import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SiteHeader } from "./site-header";

function HeaderStoryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-primary">
      {children}
      <main id="main-content" className="min-h-40" />
    </div>
  );
}

function SiteHeaderStory() {
  return (
    <HeaderStoryLayout>
      <SiteHeader />
    </HeaderStoryLayout>
  );
}

const meta = {
  title: "Components/Header",
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The one shared header used on every route. Its bar — name/role lockup left, Home and Resume right — renders at md and up only; below md it renders just the skip link and hands navigation to MobileNav's fixed pill, which is what the Mobile story shows.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SiteHeaderStory />,
};

export const Mobile: Story = {
  render: () => <SiteHeaderStory />,
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
};

export const Tablet: Story = {
  render: () => <SiteHeaderStory />,
  globals: {
    viewport: { value: "tablet", isRotated: false },
  },
};

export const Desktop: Story = {
  render: () => <SiteHeaderStory />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};
