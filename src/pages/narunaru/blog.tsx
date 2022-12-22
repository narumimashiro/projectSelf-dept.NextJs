import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import type { ReactElement } from 'react'
import { getAllArticleInfo } from '@/lib/postblog'
import NavBar from '@/components/layouts/navbar'
import MikuFooter from '@/components/layouts/mikufooter'
import Sakura from '@/components/layouts/sakura'
import styles from '@/styles/pages/Blog.module.sass'
import utilStyles from '@/styles/utility.module.sass'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const articleDataList = getAllArticleInfo()

  return {
    props: {
      articleDataList
    },
  }
}

const Blog = ({ articleDataList }: Props) => {

  const editDate = (date: string) => {
    // date : YYYYMMDD
    const year = date.slice(0, 4)
    const month = date.slice(4, 6)
    const day = date.slice(6, 8)
    return year + '-' + month + '-' + day
  }

  return (
    <div className="mt-7">
      <Head>
        <title>Blog | Next/React</title>
        <meta name='discription' content='SSG Narumi Blog Page created by NextJs' />
      </Head>
      <Sakura/>
      <section className={styles['blog-header']}>
        <p className={utilStyles['header-title']}>BLOG</p>
        <p className={utilStyles['content-20px']}>
          This page is for my blog and writing down what learned self learning<br/>
          I'm sorry, if I made a mistake... pls go easy on me...
        </p>
      </section>
      <section className={styles['blog-body']}>
        <div className={styles.grid}>
          {articleDataList.map(el =>
            <article key={el.article}>
              <Link href={'./blog/'+`${el.article}`}>
                <img src={el.thumbnail}
                     alt={el.thumbnail} />
              </Link>
              <Link href={'./blog/'+`${el.article}`}>
                <p className={utilStyles['content-title']}>{el.title}</p>
              </Link>
              <small className={utilStyles['light-style']}>{editDate(el.date)}</small>
            </article>
          )}
        </div>
      </section>
    </div>
  )
}

Blog.getLayout = (Blog: ReactElement) => {
  return (
    <>
      <NavBar>
        { Blog }
      </NavBar>
      <MikuFooter/>
    </>
  )
}
export default Blog