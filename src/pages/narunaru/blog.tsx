import Head from 'next/head'
import { InferGetStaticPropsType } from 'next'
import type { ReactElement } from 'react'
import { getAllArticleInfo } from '@/pages/lib/postblog'
import NavBar from '@/components/layouts/navbar'
import MikuFooter from '@/components/layouts/mikufooter'

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
  return (
    <div>
      <Head>
        <title>Blog | Next/React</title>
        <meta name='discription' content='SSG Narumi Blog Page created by NextJs' />
      </Head>
      <h1>This page will be blog page</h1>
      <p>{articleDataList[1].article}</p>
      <p>{articleDataList[1].title}</p>
      <p>{articleDataList[1].date}</p>
      <img src={articleDataList[1].thumbnail} />
    </div>
  )
}

Blog.getLayout = (Blog: ReactElement) => {
  return (
    <>
      <NavBar>
        { Blog }
      </NavBar>
      <MikuFooter />
    </>
  )
}
export default Blog