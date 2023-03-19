import type { NextApiRequest, NextApiResponse } from 'next'
import { doc, collection, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { signInAnonymously } from 'firebase/auth'
import { db, auth } from '@/lib/firebase'
import { UID, CommentData } from '@/recoil/tool/types'

const BULLETINBOARD = 'BulletinBoard'

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<Array<UID & CommentData> | string>
  ) => {

    // Anonymouse Login
    signInAnonymously(auth).then(() => {
      console.log('Anonymouse Login Success')
    })
    .catch((error) => {
      console.log(error.message)
      return res.status(500).json('Anonymouse Authentication Error')
    })

    const dataCollection = collection(db, BULLETINBOARD)

    // GET Request
    if(req.method === 'GET') {
      let resData = Array<UID & CommentData>()
      await getDocs(dataCollection).then((snapshot) => {
        snapshot.docs.map((doc) => {
          resData.unshift({
            uid: doc.id,
            user: doc.data().user,
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
      await addDoc(dataCollection, {...req.body}).then(() => {
        return res.status(200).json('Send Complete')
      })
      .catch((error) => {
        console.log(error.message)
        return res.status(500).json('Sorry, cannot get firebase collection...')
      })
    }

    // Delete Request
    else if(req.method === 'DELETE') {
      if(req.body.mode == 'commentdelete') {
        const delCollection = doc(db, BULLETINBOARD, req.body.uid)
        await updateDoc(delCollection, {
          comment: 'Comment Removed...'
        })
        .then(() => {
          return res.status(200).json('success delete comment')
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json('Failed delete comment, please try again')
        })
      }
      else if(req.body.mode == 'completedelete') {
        await deleteDoc(doc(db, BULLETINBOARD, req.body.uid))
      }
    }
}
export default handler