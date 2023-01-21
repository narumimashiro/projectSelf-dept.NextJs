import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { useEffect }  from 'react'

const Profile = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    const modalInfo= {
      title: 'Notice',
      style: {
        width: 900,
        height: 600,
        fSize: 50,
      },
      component: 'commingsoon'
    }
    dispatch(modalReducer.openModal(modalInfo))
  }, [])

  return (
    <div>
      <Head>
        <title>B.T.W | Profile</title>
      </Head>
      <div className="flex h-screen justify-center items-center">
        <h1 className="text-4xl">It will be Profile page...someday...</h1>
      </div>
    </div>
  )
}
export default Profile