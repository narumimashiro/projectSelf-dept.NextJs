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
  let articleDataList = Array<BlogInfo>(blogList.length - 1)

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

const getArticleData = (slug: string) => {
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
  const blgLen = blogList.length
  for(let i = 0; i < blgLen; i++) {
    for(let j = blgLen - 1; i < j; j--) {
      if(blogList[j].date > blogList[j - 1].date) {
        let tmp = blogList[j]
        blogList[j] = blogList[j - 1]
        blogList[j - 1] = tmp
      }
    }
  }
}

export { getAllArticleId, getAllArticleInfo, getArticleData }