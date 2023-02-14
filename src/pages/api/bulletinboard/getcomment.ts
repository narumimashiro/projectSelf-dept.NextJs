import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

interface CommentData {
  id: string,
  date: string,
  comment: string,
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Array<CommentData>>
  ) => {

  let resData = Array<CommentData>()
  const chatdata = collection(db, 'BulletinBoard')
  await getDocs(chatdata).then((snapshot) => {
    snapshot.docs.map((doc) => {
      resData.unshift({
        id: doc.data().id,
        date: doc.data().date,
        comment: doc.data().comment,
      })
    })
  })

  return res.status(200).json(resData)
}
export default handler