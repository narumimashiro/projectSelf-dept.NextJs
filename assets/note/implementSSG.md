---
title: 'SSG/SSR NextJs'
date: '20230219'
thumbnail: '/images/NextJs.jpg'
---

# ***SSGの実装***

## **ディレクトリ構成**
```Text
src――lib
    |  |―postblog.ts // ファイルをやり取りをする
    |
    |―pages
       |―main
          |―blog.tsx // ブログの一覧が表示されているページ
          |―blog
              |―[article].tsx // 任意のページに対して行う
```

## **postblog.ts** 

ファイルを読み込んだりとデータを扱う役割

```typescript
import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

interface BlogInfo {
  readonly article: string,
  readonly title: string,
  readonly date: string,
  readonly thumbnail: string,
  readonly content: string,
}

const blogDirectory = path.join(process.cwd(), 'assets/blog')

const getAllArticleId = async () => {
  const blogList = fs.readdirSync(blogDirectory)
  return blogList.map(el => {
    return {
      params: {
        article: el.replace(/\.md$/, '')
      }
    }
  })
}

const getAllArticleInfo = async () => {
  const blogList = fs.readdirSync(blogDirectory)
  let articleDataList = Array<BlogInfo>(blogList.length)

  blogList.forEach((el, index) => {
    const article = el.replace(/\.md$/, '')
    const fullPath = path.join(blogDirectory, el)
    const blogData = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(blogData)

    articleDataList[index] = {
      article  : article,
      title    : data.title,
      date     : data.date,
      thumbnail: data.thumbnail,
      content  : content,
    }
  })
  sortBlogList(articleDataList)
  
  return articleDataList
}

const getArticleData = async (slug: string) => {
  const fullPath = path.join(blogDirectory, `${slug}.md`)
  const blogData = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(blogData)

  const articleData: BlogInfo = {
    article  : slug,
    title    : data.title,
    date     : data.date,
    thumbnail: data.thumbnail,
    content  : content,
  }

  return articleData
}

export const sortBlogList = (blogList: Array<BlogInfo>) => {
  const blgLen = blogList.length - 1
  for(let i = 0; i < blgLen; i++) {
    for(let j = blgLen; i < j; j--) {
      if(blogList[j].date > blogList[j - 1].date) {
        let tmp = blogList[j]
        blogList[j] = blogList[j - 1]
        blogList[j - 1] = tmp
      }
    }
  }
}

export { getAllArticleId, getAllArticleInfo, getArticleData }
```
## **blog.tsx**

サムネなど表示して、クリックすると各ブログ記事へ飛ぶリンクなどが書いてある。  
ここにもSSGの実装がある
```typescript
import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import type { ReactElement } from 'react'
import { getAllArticleInfo } from '@/lib/postblog'
import NavBar from '@/components/layouts/navbar'
import MikuFooter from '@/components/layouts/mikufooter'
import Sakura from '@/components/layouts/sakura'
import styles from '@/styles/pages/Blog.module.sass'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const articleDataList = await getAllArticleInfo()

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
    <div className="mt-28">
      <Head>
        <title>Blog | Next/React</title>
        <meta name='discription' content='SSG Blog Page created by NextJs' />
      </Head>
      <Sakura/>
      <section className="text-center mb-12">
        <p className="text-8xl font-bold underline decoration-4">BLOG</p>
        <p className="text-xl italic pt-4">
          This page is for my blog and writing down what learned self learning<br/>
          I'm sorry, if I made a mistake... pls go easy on me...
        </p>
      </section>
      <section className="mb-12">
        <div className={styles.grid}>
          {articleDataList.map(el =>
            <article key={el.article}>
              <Link href={'./blog/'+`${el.article}`}>
                <img src={el.thumbnail}
                     alt={el.thumbnail} />
              </Link>
              <Link href={'./blog/'+`${el.article}`}>
                <p className="text-2xl font-bold pt-4 hover:underline">{el.title}</p>
              </Link>
              <small className="text-base text-gray-400">{editDate(el.date)}</small>
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
```
## **[article].tsx**
---
任意のページについて処理を行う、SSGの実装におけるメインの話はここで行われている
```typescript

import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import { getAllArticleId, getArticleData } from '@/lib/postblog'
import { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next'
import styles from '@/styles/pages/BlogArticle.module.sass'
import CodeBlock from '@/components/codeblock'
import Sakura from '@/components/layouts/sakura'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllArticleId()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{article: string}>) => {
  const articleData = await getArticleData(context.params!.article)
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
      <Sakura/>
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
```