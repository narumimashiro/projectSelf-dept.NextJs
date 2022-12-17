
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { getAllArticleId, getArticleData } from '@/lib/postblog'
import { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import styles from '@/styles/pages/BlogArticle.module.sass'
import CodeBlock from '@/components/codeblock'

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

const BlogArticle = ({articleData}: Props) => {
  return (
    <div>
      <Head>
        <title>Blog | {articleData.title}</title>
        <meta name='discription' content='This page for writing down what learned self learning' />
      </Head>
      <ReactMarkdown 
        className={styles.markdown}
        children={articleData.content}
        components={{
          code: CodeBlock
        }}
      />
    </div>
  )
}
export default BlogArticle