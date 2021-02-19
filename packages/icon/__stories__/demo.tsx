import { Meta } from '@storybook/react/types-6-0'
import styles from './index.module.scss'

import { Up, Left, Down, Right, Check, CircleFilled, GitHub } from '../lib'

export default {
    title: 'Icon',
} as Meta

function IconBoxList({ children }: any) {
    return <ul className={styles.iconBoxList}>{children}</ul>
}

function IconBox({ Icon }: any) {
    return (
        <li className={styles.iconBox}>
            <Icon />
            <span className={styles.iconBoxName}>{Icon.displayName || Icon.name}</span>
        </li>
    )
}

const icons = [Up, Down, Left, Right, Check, CircleFilled, GitHub]

export const Icons = () => {
    return (
        <IconBoxList>
            {icons.map((Icon) => (
                <IconBox Icon={Icon} />
            ))}
        </IconBoxList>
    )
}
