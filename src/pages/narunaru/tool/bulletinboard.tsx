import Head from 'next/head'
import { useState, useEffect, useLayoutEffect } from 'react'
import axios from 'axios'

// ApiURL定義
const API_BASEPATH = '/api/bulletinboard'
const GET_CHAT = '/getcomment'

interface CommentData {
  id: string,
  date: string,
  comment: string
}

const BulletinBoard = () => {

  const [commentData, setCommentData] = useState(Array<CommentData>)

  useEffect(() => {
    (async () => {
      setCommentData(await getChatData())
    })()
  }, [])

  const getChatData = async () => {
    const res = await axios.get(`${API_BASEPATH}${GET_CHAT}`)
    return res.data
  }

  const temp = () => {
    console.log(commentData)
  }

  return (
    <div>
      <Head>
        <title>Tool | BulletinBoard</title>
        <meta name="discription" content="bulletin board free chat/comment space"></meta>
      </Head>
      <h1 className="mt-20">Bulletin Board</h1>
      <button className="mt-20" onClick={getChatData}>Button</button>
      <button onClick={temp}>TEMP</button>
    </div>
  )
}
export default BulletinBoard