import { useEffect } from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'

function Home() {
    const context = useDocusaurusContext()
    const { siteConfig = {} } = context

    useEffect(() => {
        document.documentElement.setAttribute('data-index', 'true');

        return () => {
            document.documentElement.removeAttribute('data-index');
        }
    });

    return (
        <Layout
            className="without"
            description="一套写着玩的 React 组件库"
            // image=""
            // keywords={[]}
        >
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
