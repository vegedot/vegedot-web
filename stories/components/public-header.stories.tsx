import type { Meta, StoryObj } from '@storybook/react-vite'
import PublicHeader from '../../app/components/shared/public-header'

const meta: Meta<typeof PublicHeader> = {
  title: 'Shared/PublicHeader',
  component: PublicHeader,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
