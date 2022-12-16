
import Head from 'next/head'
import { getAllArticleId, getArticleData } from '@/pages/lib/postblog'
import { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllArticleId()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{article: string}>) => {
  const articleData = getArticleData(context.params!.article)
  return {
    props: {
      articleData,
    }
  }
}

type Props = InferGetStaticPropsType<typeof getStaticProps>

const Article = ({articleData}: Props) => {
  return (
    <div>
      {articleData.content}
    </div>
  )
}
export default Article