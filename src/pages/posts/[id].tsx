import { getAllPostId, getPostsData } from '@/lib/post';
import { InferGetStaticPropsType, GetStaticPaths, GetStaticPropsContext } from 'next';
import styles from 'styles/main/Posts.module.sass'
import utilStyles from 'styles/utils.module.sass'

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostId();
  return {
    paths,
    fallback: false, // falseにするとIdに含まれないものは404を返すようになる
  }
}

export const getStaticProps = async (context:GetStaticPropsContext<{ id:string }>) => {
  const postData = await getPostsData(context.params!.id);
  return {
    props: {
      postData,
    },
  };
}

type Props = InferGetStaticPropsType<typeof getStaticProps>;
const MdViewer = ({ postData }: Props) => {
  
  return (
    <div>
      <article className={styles.container}>
        <h1 className={utilStyles.headingX1}>{ postData.title }</h1>
        <div className={utilStyles.lightText}>{ postData.date }</div>
        {/* dangerouslySetInnerHTMLはalertや悪意のあるものも実行してしまうので、
        事前にサニタイズをしてから出力するようにしないといけない */}
        <div dangerouslySetInnerHTML={{__html: postData.content }}/>
      </article>
    </div>
  );
}

export default MdViewer;