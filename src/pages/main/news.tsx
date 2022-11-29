import Head from 'next/head'
import Link from 'next/link';
import type { ReactElement } from 'react'
import NavBar from '@/components/layouts/NavBar'
import MikuFooter from '@/components/layouts/FooterMiku'
import styles from 'styles/main/News.module.sass'
import utilStyles from 'styles/utils.module.sass'
import { getPostsData } from '@/lib/post'
import { InferGetStaticPropsType } from 'next';

// ********** SSGとして実装
// nextjsの用意関数 外部から一度だけデータを取ってくる関数
export const getStaticProps = async () => {
  const postData = getPostsData();
  
  // getStaticPropsのお決まりreturn
  return {
    props: {
      postData,
    },
  };
}
// SSGとして実装 **********

// ********** SSRとして実装 
// export const getServerSideProps = async (context) => {
//   // SSGのときに実装したpost.tsでfetch関数などを用いてデータベースから取得したデータを用いる
//   return {
//     props: {
//       // コンポーネントに渡すためのprops
//     }
//   }
// }
// SSRとして実装 **********

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const News = ( { postData }: Props ) => {
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
          { postData.map(({id, title, date, thumbnail}) => (
            <article key={id}>
              <Link href={`posts/${id}`}>
                <img
                className={styles.thumbnailImage}
                src={thumbnail}
                alt={id} />
              </Link>
              <Link href={`posts/${id}`}>
                <p className={utilStyles.boldText}>{ title }</p>
              </Link>
              <small className={utilStyles.lightText}>{ date }</small>
            </article>
          ))}
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