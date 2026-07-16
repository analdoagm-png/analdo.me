import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CaseStudyCard } from "./case-study-card";

const meta = {
  title: "Components/Case Study Card",
  component: CaseStudyCard,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-[640px]">
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
} satisfies Meta<typeof CaseStudyCard>;

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
