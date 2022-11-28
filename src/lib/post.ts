import path from "path";
import fs from "fs";
import matter from "gray-matter"

// process.cwd()はcurrent dirctoryのこと
const postDirectory = path.join(process.cwd(), "src/posts");

// mdファイルデータを取り出す
export function getPostsData() {
  // dirctory内のファイル名をオブジェクトで取得する
  const fileNames = fs.readdirSync(postDirectory);
  const allPostData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');

    // ファイルパスの取得
    const fullPath = path.join(postDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // npm install gray-matter →　markdownファイルを解析するもの
    const matterResult = matter(fileContents);

    // idとデータを返す
    return {
      id,
      ...matterResult.data, 
    };
  });

  return allPostData;
}