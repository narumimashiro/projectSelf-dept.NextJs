import Head from 'next/head'
import { useState, useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import axios from 'axios'
import { userId } from '@/recoil/tool/bulletinboard'

// MyComponent
import CommentBox from '@/components/ui_components/tool/commentbox'

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

  const addCommentToDB = async () => {
    const sendData: CommentData = {
      id: userid,
      date: '20230817063039',
      comment: 'temp message'
    }
    await axios.post(API_COMMENTDATA, {...sendData})
  }

  const temp = () => {
    console.log(commentData)
    // axios.delete(API_COMMENTDATA)
    console.log('Push')
    // console.log(getCommentFromDB())
    // addCommentToDB()
  }

  return (
    <div>
      <Head>
        <title>Tool | BulletinBoard</title>
        <meta name="discription" content="bulletin board free chat/comment space"></meta>
      </Head>
      {/* 左半分固定エリア */}
      <div className="fixed w-1/2 h-screen mt-20">
        <button onClick={temp}>temp</button>
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