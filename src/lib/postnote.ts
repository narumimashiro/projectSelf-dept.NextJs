import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'

interface NoteInfo {
  readonly article: string,
  readonly title: string,
  readonly date: string,
  readonly thumbnail: string,
  readonly content: string,
}

const noteDirectory = path.join(process.cwd(), 'assets/note')

const getAllArticleId = async () => {
  const noteList = fs.readdirSync(noteDirectory)
  return noteList.map(el => {
    return {
      params: {
        article: el.replace(/\.md$/, '')
      }
    }
  })
}

const getAllArticleInfo = async () => {
  const noteList = fs.readdirSync(noteDirectory)
  let articleDataList = Array<NoteInfo>(noteList.length)

  noteList.forEach((el, index) => {
    const article = el.replace(/\.md$/, '')
    const fullPath = path.join(noteDirectory, el)
    const noteData = fs.readFileSync(fullPath, 'utf-8')
    const { data, content } = matter(noteData)

    articleDataList[index] = {
      article  : article,
      title    : data.title,
      date     : data.date,
      thumbnail: data.thumbnail,
      content  : content,
    }
  })
  sortNoteList(articleDataList)
  
  return articleDataList
}

const getArticleData = async (slug: string) => {
  const fullPath = path.join(noteDirectory, `${slug}.md`)
  const noteData = fs.readFileSync(fullPath, 'utf-8')
  const { data, content } = matter(noteData)

  const articleData: NoteInfo = {
    article  : slug,
    title    : data.title,
    date     : data.date,
    thumbnail: data.thumbnail,
    content  : content,
  }

  return articleData
}

export const sortNoteList = (noteList: Array<NoteInfo>) => {
  const blgLen = noteList.length - 1
  for(let i = 0; i < blgLen; i++) {
    for(let j = blgLen; i < j; j--) {
      if(noteList[j].date > noteList[j - 1].date) {
        let tmp = noteList[j]
        noteList[j] = noteList[j - 1]
        noteList[j - 1] = tmp
      }
    }
  }
}

export { getAllArticleId, getAllArticleInfo, getArticleData }