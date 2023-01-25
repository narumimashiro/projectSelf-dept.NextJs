import Head from 'next/head'
import Link from 'next/link'
import { InferGetStaticPropsType } from 'next'
import { getAllArticleInfo } from '@/lib/postnote'
import Sakura from '@/components/ui_components/sakura'
import styles from '@/styles/pages/Note.module.sass'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export const getStaticProps = async () => {
  const articleDataList = await getAllArticleInfo()

  return {
    props: {
      articleDataList
    },
  }
}

const Note = ({ articleDataList }: Props) => {

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
        <title>B.T.W | Note</title>
        <meta name='discription' content='SSG Narumi Note Page created by NextJs' />
      </Head>
      <Sakura/>
      <section className="text-center mb-12">
        <p className="text-8xl font-bold underline decoration-4">NOTE</p>
        <p className="text-xl italic pt-4">
          This page is for writing down what learned self learning<br/>
          I'm sorry, if I made a mistake... pls go easy on me...
        </p>
      </section>
      <section className="mb-12">
        <div className={styles.grid}>
          {articleDataList.map(el =>
            <article key={el.article}>
              <Link href={'./note/'+`${el.article}`}>
                <img src={el.thumbnail}
                     alt={el.thumbnail} />
              </Link>
              <Link href={'./note/'+`${el.article}`}>
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
export default Note