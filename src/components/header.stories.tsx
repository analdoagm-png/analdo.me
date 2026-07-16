import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyHeader } from "./case-study-header";
import { SiteHeader } from "./site-header";

function HeaderStoryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-dark-primary">
      {children}
      <main id="main-content" className="min-h-40" />
    </div>
  );
}

function HomepageHeaderStory() {
  return (
    <HeaderStoryLayout>
      <SiteHeader />
    </HeaderStoryLayout>
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
  title: "Components/Header",
  component: SiteHeader,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "The homepage header identifies the portfolio. The case-study header adds a return link and shows the identity line from the tablet breakpoint upward.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Homepage: Story = {
  render: () => <HomepageHeaderStory />,
};

export const HomepageMobile: Story = {
  name: "Homepage / Mobile",
  render: () => <HomepageHeaderStory />,
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
};

export const HomepageTablet: Story = {
  name: "Homepage / Tablet",
  render: () => <HomepageHeaderStory />,
  globals: {
    viewport: { value: "tablet", isRotated: false },
  },
};

export const HomepageDesktop: Story = {
  name: "Homepage / Desktop",
  render: () => <HomepageHeaderStory />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};

export const CaseStudy: Story = {
  render: () => <CaseStudyHeaderStory />,
};

export const CaseStudyMobile: Story = {
  name: "Case Study / Mobile",
  render: () => <CaseStudyHeaderStory />,
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
};

export const CaseStudyTablet: Story = {
  name: "Case Study / Tablet",
  render: () => <CaseStudyHeaderStory />,
  globals: {
    viewport: { value: "tablet", isRotated: false },
  },
};

export const CaseStudyDesktop: Story = {
  name: "Case Study / Desktop",
  render: () => <CaseStudyHeaderStory />,
  globals: {
    viewport: { value: "desktop", isRotated: false },
  },
};
