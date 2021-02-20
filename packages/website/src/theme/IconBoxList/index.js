import styles from './styles.module.scss'

export default function IconBoxList({ icons }) {
    return (
        <ul className={styles.list}>
            {Object.keys(icons).map((name) => (
                <IconBox key={name} icon={icons[name]} name={name} />
            ))}
        </ul>
    )
}

function IconBox({ icon: Icon, name }) {
    return (
        <li className={styles.item}>
            <Icon />
            <span className={styles.itemName}>{name}</span>
        </li>
    )
}
