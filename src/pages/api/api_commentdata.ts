import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { signInAnonymously } from 'firebase/auth'
import { db, auth } from '@/lib/firebase'

interface CommentData {
  uid: string,
  id: string,
  date: string,
  comment: string,
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Array<CommentData> | string>
  ) => {

    // Anonymouse Login
    signInAnonymously(auth).then(() => {
      console.log('Anonymouse Login Success')
    })
    .catch((error) => {
      console.log(error.message)
      return res.status(500).json('Anonymouse Authentication Error')
    })

    const dataCollection = collection(db, 'BulletinBoard')

    // GET Request
    if(req.method === 'GET') {
      let resData = Array<CommentData>()
      await getDocs(dataCollection).then((snapshot) => {
        snapshot.docs.map((doc) => {
          resData.unshift({
            uid: doc.id,
            id: doc.data().id,
            date: doc.data().date,
            comment: doc.data().comment,
          })
        })
        return res.status(200).json(resData)
      })
      .catch((error) => {
        console.log(error.message)
        return res.status(500).json('Sorry, cannot get firebase collection...')
      })
    }

    // POST Request
    else if(req.method === 'POST') {
      await addDoc(dataCollection, {...req.body})
      console.log({...req.body})
    }

    // Delete Request
    else if(req.method === 'DELETE') {
    }
}
export default handler