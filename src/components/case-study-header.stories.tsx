import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyHeader } from "./case-study-header";

function HeaderStoryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-primary">
      {children}
      <main id="main-content" className="min-h-40" />
    </div>
  );
}

function CaseStudyHeaderStory() {
  return (
    <HeaderStoryLayout>
      <CaseStudyHeader />
    </HeaderStoryLayout>
  );
}

const meta = {
  title: "Components/Case Study Header",
  component: CaseStudyHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The case-study header adds a return-to-portfolio link and shows the identity line from the tablet breakpoint upward. The homepage no longer uses a shared site header — its identity/nav content lives in the sidebar and mobile top bar in `page.tsx` instead.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CaseStudyHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <CaseStudyHeaderStory />,
};

export const Mobile: Story = {
  render: () => <CaseStudyHeaderStory />,
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
};

export const Tablet: Story = {
  render: () => <CaseStudyHeaderStory />,
  globals: {
    viewport: { value: "tablet", isRotated: false },
  },
};

export const Desktop: Story = {
  render: () => <CaseStudyHeaderStory />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};
