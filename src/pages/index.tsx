import Head from 'next/head'
import styles from '@/styles/Home.module.sass'
import Getmetric from '@/components/layouts/geometric'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next/React App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Getmetric/>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to My Site
        </h1>
        <h2 className={styles['sub-title']}>
          This page is created using <span>NextJs</span> + <span>TypeScript</span>
        </h2>
      </main>
    </div>
  )
}