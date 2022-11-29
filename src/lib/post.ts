import path from "path";
import fs from "fs";
import matter from "gray-matter"

// process.cwd()はcurrent dirctoryのこと
const postDirectory = path.join(process.cwd(), "src/posts");

type PostData = {
  id:string,
  title:string,
  date:string,
  thumbnail:string
}

// mdファイルデータを取り出す
export function getPostsData(): Array<PostData> {
  // dirctory内のファイル名をオブジェクトで取得する
  const fileNames = fs.readdirSync(postDirectory);

  const postdata: Array<PostData> = Array(fileNames.length).fill({id:'', title:'', date:'', thumbnail:''});
  fileNames.forEach((el, index) => {
    const id = el.replace(/\.md$/, '');
    const fullPath = path.join(postDirectory, el);
    const fileInfo = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(fileInfo);
    
    postdata[index] = {id: id, title: data.title, date: data.date, thumbnail: data.thumbnail};
  })


  return postdata;
}