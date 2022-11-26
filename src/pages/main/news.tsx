import Head from 'next/head'
import Link from 'next/link';
import type { ReactElement } from 'react'
import NavBar from '@/components/layouts/NavBar'
import MikuFooter from '@/components/layouts/FooterMiku'
import styles from 'styles/main/News.module.sass'
import utilStyles from 'styles/utils.module.sass'

const News = () => {
  return (
    <div>
      <Head>
        <title>NEWS | Next/React App</title>
      </Head>
      <section>
        <p>This page for using News is created like blog site</p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h1>NEWS</h1>
        <div className={styles.grid}>
          <article>
            <Link href="/">
              <img
              className={styles.thumbnailImage}
              src="/images/HatsuneMikuVsing.jpg"
              alt="HatsuneMiku" />
            </Link>
            <Link href="/">
              <p className={utilStyles.boldText}>Virtual Singer Hatsune Miku</p>
            </Link>
            <small className={utilStyles.lightText}>October 31, 2022</small>
          </article>
          <article>
            <Link href="/">
              <img
              className={styles.thumbnailImage}
              src="/images/HatsuneMikuAtNightCode.jpg"
              alt="HatsuneMiku" />
            </Link>
            <Link href="/">
              <p className={utilStyles.boldText}>Virtual Singer Hatsune Miku</p>
            </Link>
            <small className={utilStyles.lightText}>October 31, 2022</small>
          </article>
          <article>
            <Link href="/">
              <img
              className={styles.thumbnailImage}
              src="/images/HatsuneMikuMoreMore.jpg"
              alt="HatsuneMiku" />
            </Link>
            <Link href="/">
              <p className={utilStyles.boldText}>Virtual Singer Hatsune Miku</p>
            </Link>
            <small className={utilStyles.lightText}>October 31, 2022</small>
          </article>
          <article>
            <Link href="/">
              <img
              className={styles.thumbnailImage}
              src="/images/HatsuneMikuLeoNeed.jpg"
              alt="HatsuneMiku" />
            </Link>
            <Link href="/">
              <p className={utilStyles.boldText}>Virtual Singer Hatsune Miku</p>
            </Link>
            <small className={utilStyles.lightText}>October 31, 2022</small>
          </article>
          <article>
            <Link href="/">
              <img
              className={styles.thumbnailImage}
              src="/images/HatsuneMikuVivid.jpg"
              alt="HatsuneMiku" />
            </Link>
            <Link href="/">
              <p className={utilStyles.boldText}>Virtual Singer Hatsune Miku</p>
            </Link>
            <small className={utilStyles.lightText}>October 31, 2022</small>
          </article>
          <article>
            <Link href="/">
              <img
              className={styles.thumbnailImage}
              src="/images/HatsuneMikuDashow.jpg"
              alt="HatsuneMiku" />
            </Link>
            <Link href="/">
              <p className={utilStyles.boldText}>Virtual Singer Hatsune Miku</p>
            </Link>
            <small className={utilStyles.lightText}>October 31, 2022</small>
          </article>
        </div> 
      </section>
      
    </div>
  )
}

News.getLayout = (News: ReactElement) => {
  return (
    <div>
      <NavBar>
        { News }
      </NavBar>
      <MikuFooter />
    </div>
    
  )
}

export default News;