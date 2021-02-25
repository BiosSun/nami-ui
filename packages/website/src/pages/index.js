import { useLayoutEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

function Home() {
    const context = useDocusaurusContext()
    const { siteConfig = {} } = context

    useLayoutEffect(() => {
        document.documentElement.setAttribute('data-index', 'true')

        return () => {
            document.documentElement.removeAttribute('data-index')
        }
    })

    return (
        <Layout description="一套基于 React 实现的组件库，混乱中立。">
            <main className={styles.main}>
                <img
                    className={styles.logo}
                    src={useBaseUrl('img/logo.svg')}
                    alt={siteConfig.title}
                />
                <p className={styles.tagline}>{siteConfig.tagline}</p>
            </main>
        </Layout>
    )
}

export default Home
