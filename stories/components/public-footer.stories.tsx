import type { Meta, StoryObj } from '@storybook/react-vite'
import PublicFooter from '../../app/components/shared/public-footer'

const meta: Meta<typeof PublicFooter> = {
  title: 'Shared/PublicFooter',
  component: PublicFooter,
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
}
