import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import ReactMarkdown from 'react-markdown'
import styles from '@/styles/pages/NoteArticle.module.sass'
import { useEffect, useState, useLayoutEffect } from 'react'
import matter from 'gray-matter'

import { getApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebase = () => {

  const firebaseApp = getApp()
  const storage = getStorage(firebaseApp, 'gs://bocchi-the-work.appspot.com')
  console.log(storage)

  const [dbList, setDB] = useState(Array<any>)
  let view = false

  useLayoutEffect(() => {
    const postdata = collection(db, 'note')
    getDocs(postdata).then((snapShot)=> {
      setDB(snapShot.docs.map((doc) => {
        const { content } = matter(doc.data().context)
        return {
          title: doc.data().title,
          date: doc.data().date,
          thumbnail: doc.data().thumbnail,
          context: content
        }
      }
      ))
    })
  }, [])
  

  const temp = async () => {
    console.log(dbList[0].context)
    view = !view
    console.log(view)
  }
  

  return (
    <div className="mt-20">
      <h1>Firebase</h1>
      <button onClick={temp}>Button</button>
      {dbList.map((el) => (
        <ReactMarkdown
          key={el.title}
          className={styles.markdown}
          children={el.context}/>
      ))}
      {/* <ReactMarkdown
        className={styles.markdown}
        children={dbList[0].context!}
      /> */}
    </div>
  )
}
export default firebase