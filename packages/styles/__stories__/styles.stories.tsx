import { Story } from '@storybook/react/types-6-0'
import '../variables.scss'

export default {
    title: 'Styles',
}

export const Color: Story = () => {
    return (
        <>
            <div style={{ width: 100, height: 100, background: 'var(--nami-primary-500)' }} />
        </>
    )
}
