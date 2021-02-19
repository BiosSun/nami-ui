import { Fragment } from 'react'
import { useThemeConfig } from '@docusaurus/theme-common'
import Markdown from 'react-markdown'
import styles from './styles.module.scss'

function Footer() {
    const { footer } = useThemeConfig()

    if (!footer) {
        return null
    }

    return (
        <footer className={styles.footer}>
            <Markdown
                escapeHtml={false}
                source={footer.copyright}
                renderers={{
                    root: Fragment,
                }}
            />
        </footer>
    )
}

export default Footer
