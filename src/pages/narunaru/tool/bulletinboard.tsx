import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import axios from 'axios'
import { userId } from '@/recoil/tool/bulletinboard'
import { whatTimeIsItNow } from '@/lib/commonstring'

// MyComponent
import CommentBox from '@/components/ui_components/tool/commentbox'
import SendMessage from '@/components/ui_components/tool/sendmessage'

// ApiURL定義
const API_COMMENTDATA = '/api/api_commentdata'

type UID = {
  uid: string
}

type CommentData = { 
  id: string,
  date: string,
  comment: string
}

const BulletinBoard = () => {

  const userid = useRecoilValue(userId)
  const [commentData, setCommentData] = useState(Array<UID & CommentData>)
  const [commentText, setComment] = useState('')

  useEffect(() => {
    (async () => {
      setCommentData(await getCommentFromDB())
    })()
  }, [])

  const getCommentFromDB = async () => {
    return await axios.get(API_COMMENTDATA).then((res) => {
      return res.data
    })
    .catch((res) => {
      console.log(res.response.data)
    })
  }

  const clearText = () => {
    setComment('')
  }

  const addCommentToDB = async () => {
    const sendData: CommentData = {
      id: userid,
      date: whatTimeIsItNow(),
      comment: commentText
    }
    await axios.post(API_COMMENTDATA, {...sendData}).then((res) => {
      clearText()
    })

  }

  const inputComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const temp = () => {
    // console.log(commentData)
    // axios.delete(API_COMMENTDATA)
    // console.log(whatTimeIsItNow())
    // console.log(getCommentFromDB())
    addCommentToDB()
  }

  return (
    <div>
      <Head>
        <title>Tool | BulletinBoard</title>
        <meta name="discription" content="bulletin board free chat/comment space"></meta>
      </Head>
      {/* 左半分固定エリア */}
      <div className="fixed w-1/2 h-screen pt-20">
        <div className="absolute w-5/6 h-52 bottom-24 left-1/2 -translate-x-1/2">
          <SendMessage message={commentText}
                       callbackChange={(e) => inputComment(e)}
                       callbackClick={() => addCommentToDB()}/>
        </div>
      </div>
      {/* 右半分コメント表示エリア */}
      <div className="flex flex-col border-4 w-1/2 min-h-screen mt-20 float-right">
        {commentData.map((el, index) => (
          <CommentBox key={index}
                      index={index}
                      id={el.id}
                      date={el.date}
                      comment={el.comment}
          />
        ))}
      </div>
    </div>
  )
}
export default BulletinBoard