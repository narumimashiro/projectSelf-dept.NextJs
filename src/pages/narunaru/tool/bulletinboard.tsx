import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import axios from 'axios'

// MyComponent
import CommentBox from '@/components/ui_components/tool/commentbox'
import SendMessage from '@/components/ui_components/tool/sendmessage'

// Recoil
import { commentData, isChange } from '@/recoil/tool/bulletinboard'
// lib
import { sortInDateOrder } from '@/lib/common'
// ApiURL定義
export const API_COMMENTDATA = '/api/api_commentdata'

interface Payload {
  mode: string,
  uid: string
}
// mode property
const COMMENTDELETE = 'commentdelete'
const COMPDELETE = 'completedelete'

const MAXCOMMENTS = 3

const BulletinBoard = () => {

  const [dataChange, setChange] = useRecoilState(isChange)
  const [comments, setCommentData] = useRecoilState(commentData)

  useEffect(() => {
    if(dataChange) {
      (async () => {
        const getData = await getCommentFromFirestore()
        const commentData = sortInDateOrder(getData)
        if(commentData.length > MAXCOMMENTS) {
          const payload = {
            mode: COMPDELETE,
            uid: commentData[0].uid
          }
          deleteCommentFromFirestore(payload)
          setCommentData(commentData.slice(1))
        } else {
          setCommentData(commentData)
        }
      })()
      setChange(false)
    }
  }, [dataChange])

  // 1分おきに更新かけてみる /* 暫定処理 */
  setTimeout(() => {
    setChange(true)
  }, 60 * 1000)

  const getCommentFromFirestore = async () => {
    return await axios.get(API_COMMENTDATA).then((res) => {
      // console.log(res.data) // for debug
      return res.data
    })
    .catch((res) => {
      console.log(res.response.data)
    })
  }

  const deleteCommentFromFirestore = async (payload: Payload) => {

    await axios.delete(API_COMMENTDATA, {
      data: payload
    })
    .then((res) => {
      // console.log(res.data) // for debug
      setChange(true)
    })
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
          <SendMessage/>
        </div>
      </div>
      {/* 右半分コメント表示エリア */}
      <div className="flex flex-col border-4 w-1/2 min-h-screen mt-20 float-right">
        {comments.map((el, index) => (
          <div className="flex" key={index}>
            <CommentBox key={index}
                        index={index}
                        id={el.user}
                        date={el.date}
                        comment={el.comment}
            />
            <button className="pr-8"
                    onClick={() => deleteCommentFromFirestore({mode : COMMENTDELETE, uid : el.uid})}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default BulletinBoard