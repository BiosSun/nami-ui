import { useLayoutEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { Helmet } from 'react-helmet'
import styles from './styles.module.css'

function Home() {
    const context = useDocusaurusContext()
    const { siteConfig = {} } = context

    return (
        <Layout description="一套基于 React 实现的组件库，混乱中立。">
            <Helmet>
                <html data-index="true" />
            </Helmet>
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
