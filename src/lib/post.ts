import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// process.cwd()はcurrent dirctoryのこと
const postDirectory = path.join(process.cwd(), "src/posts");

type PostData = {
  readonly id: string,
  readonly title: string,
  readonly date: string,
  readonly thumbnail: string,
  readonly content: string
}

// mdファイルデータを取り出す
const getPostsDataList = () => {
  // dirctory内のファイル名をオブジェクトで取得する
  const fileNames = fs.readdirSync(postDirectory);

  const postdata: Array<PostData> = Array(fileNames.length).fill({id:'', title:'', date:'', thumbnail:'', content: ''});
  fileNames.forEach(async (el, index) => {
    const id = el.replace(/\.md$/, '');
    const fullPath = path.join(postDirectory, el);
    const fileInfo = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileInfo);

    const blogContent = await remark()
    .use(html)
    .process(content);
    
    postdata[index] = {id: id, title: data.title, date: data.date, thumbnail: data.thumbnail, content:blogContent.toString()};
  })

  return postdata;
}
const getAllPostId = () => {
  const fileNames = fs.readdirSync(postDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      }
    }
  })
}

const getPostsData = async (id: string) => {
  const fullPath = path.join(postDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');

  const { data, content } = matter(fileContent);

  const blogContent = await remark()
  .use(html)
  .process(content);

  const postdata: PostData = {id: id, title: data.title, date: data.date, thumbnail: data.thumbnail, content:blogContent.toString()};

  return postdata;
}

export { getPostsDataList, getAllPostId, getPostsData }