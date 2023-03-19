import Head from 'next/head'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import axios from 'axios'

// MyComponent
import CommentBox from '@/components/ui_components/tool/commentbox'
import SendMessage from '@/components/ui_components/tool/sendmessage'

// Recoil
import { commentData } from '@/recoil/tool/bulletinboard'
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

  const [comments, setCommentData] = useRecoilState(commentData)

  useEffect(() => {
    (async () => {
      const getData = await getCommentFromFirestore()
      if(getData.length > MAXCOMMENTS) {
        const payload = {
          mode: COMPDELETE,
          uid: getData[0].uid
        }
        deleteCommentFromFirestore(payload)
      }
      setCommentData(getData)
    })()
  }, [])

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
          <>
            <CommentBox key={index}
                        index={index}
                        id={el.user}
                        date={el.date}
                        comment={el.comment}
            />
            <button onClick={() => deleteCommentFromFirestore({mode : COMMENTDELETE, uid : el.uid})}>X</button>
          </>
        ))}
      </div>
    </div>
  )
}
export default BulletinBoard