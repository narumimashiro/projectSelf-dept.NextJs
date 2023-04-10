import { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import axios from 'axios'
import { API_COMMENTDATA } from '@/pages/narunaru/tool/bulletinboard'
import { whatTimeIsItNow } from '@/lib/commonstring'

// Recoil
import { userId, isChange } from '@/recoil/tool/bulletinboard'
import { CommentData } from '@/recoil/tool/types'

const SendMessage = () => {

  const userid = useRecoilValue(userId)
  const [dataChange, setChange] = useRecoilState(isChange)
  const [commentText, setComment] = useState('')

  const addCommentToFirestore = async () => {
    const sendData: CommentData = {
      user: userid,
      date: whatTimeIsItNow(),
      comment: commentText
    }
    setChange(true)
    await axios.post(API_COMMENTDATA, {...sendData}).then(() => {
      setComment('')
    })
  }

  return (
    <div className="flex flex-col w-full h-full">
      <textarea className="w-full h-40 border-2 resize-none"
                placeholder="Enter Text"
                value={commentText}
                onChange={(e) => setComment(e.target.value)}
      />
      <div className="text-right">
        <button className="w-12 h-8 bg-gray-200 mt-4 mr-8"
                onClick={addCommentToFirestore}>Send</button>
      </div>
    </div>
  )
}
export default SendMessage