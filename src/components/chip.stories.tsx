import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Chip } from "./chip";
import { ToolIcon } from "./tool-icon";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Case Study",
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ToolChips: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip label="Figma" icon={<ToolIcon name="figma" />} />
      <Chip label="Claude Code" icon={<ToolIcon name="claude" />} />
      <Chip label="Codex" icon={<ToolIcon name="codex" />} />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <div className="flex items-center gap-3">
        <Chip label="Case Study" size="md" />
        <span className="font-mono text-body-h3 text-white/50">
          md — homepage CaseStudyCard tags
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Chip label="Decision" size="sm" />
        <span className="font-mono text-body-h3 text-white/50">
          sm — editorial case-study labels (Decision, Role, Tools, Year)
        </span>
      </div>
    </div>
  ),
};
