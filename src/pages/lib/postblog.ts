import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogProps {
  readonly article: string,
  readonly title: string,
  readonly date: string,
  readonly thumbnail: string,
  readonly content: string,
}

const blogDirectory = path.join(process.cwd(), 'assets/blog')

const getAllArticleId = () => {
  const blogList = fs.readdirSync(blogDirectory)
  return blogList.map(el => {
    return {
      params: {
        article: el.replace(/\.md$/, '')
      }
    }
  })
}

const getAllArticleInfo = () => {
  const blogList = fs.readdirSync(blogDirectory)
  const articleDataList = Array<BlogProps>(blogList.length)

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

  return articleDataList
}

const getArticleData = (id: string) => {
  const articleList = getAllArticleInfo()
  return articleList.find(el => el.article === id)
}

export { getAllArticleId, getAllArticleInfo, getArticleData }