import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyIndexRow } from "./case-study-index-row";

const meta = {
  title: "Components/Case Study Index Row",
  component: CaseStudyIndexRow,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[900px] divide-y divide-stroke-dark border-t border-stroke-dark">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  args: {
    href: "/case-studies/goright",
    image: "/images/goright.png",
    title: "GoRight",
    description:
      "Replaced GoRight's inconsistent web/mobile dispatch tool with one live system - 4 of 5 beta transportation companies stayed on as paying customers.",
    chips: ["Case Study", "Dispatch", "Desktop", "Mobile"],
  },
} satisfies Meta<typeof CaseStudyIndexRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title: "Github's Security Findings",
    image: "/images/github-security.png",
    description:
      "A dashboard designed to help CTOs and managers understand code security and reliability through alerts, vulnerabilities, and dependency risks.",
    chips: ["Showcase", "Security", "Desktop"],
  },
};

export const FullList: Story = {
  render: () => (
    <>
      <CaseStudyIndexRow
        href="/case-studies/goright"
        image="/images/goright.png"
        title="GoRight"
        description="Replaced GoRight's inconsistent web/mobile dispatch tool with one live system - 4 of 5 beta transportation companies stayed on as paying customers."
        chips={["Case Study", "Dispatch", "Desktop", "Mobile"]}
      />
      <CaseStudyIndexRow
        href="/case-studies/arrowhead-transit"
        image="/images/arrowhead-transit.png"
        title="Arrowhead Transit"
        description="Rebuilt Arrowhead Transit's single-file Access database into a live dispatch platform, extending booking and tracking across web and mobile."
        chips={["Case Study", "Dispatch", "Desktop"]}
      />
      <CaseStudyIndexRow
        href="/case-studies/forty5park"
        image="/images/forty5park.png"
        title="Forty5Park"
        description="AI-powered platform for real estate companies to manage acquisitions, forecast property valuations using machine learning, and streamline due diligence workflows."
        chips={["Showcase", "Real Estate", "AI", "Desktop"]}
      />
    </>
  ),
};
