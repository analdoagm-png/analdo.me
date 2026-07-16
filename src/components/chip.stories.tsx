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
      <Chip label="Claude" icon={<ToolIcon name="claude" />} />
      <Chip label="Codex" icon={<ToolIcon name="codex" />} />
    </div>
  ),
};
