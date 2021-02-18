import React from 'react'
import styles from './styles.module.scss'

export default function IconBoxList({ icons }) {
    return (
        <ul className={styles.list}>
            {icons.map((Icon, index) => (
                <IconBox key={index} Icon={Icon} />
            ))}
        </ul>
    )
}

function IconBox({ Icon }) {
    return (
        <li className={styles.item}>
            <Icon />
            <span className={styles.itemName}>{Icon.displayName || Icon.name}</span>
        </li>
    )
}
