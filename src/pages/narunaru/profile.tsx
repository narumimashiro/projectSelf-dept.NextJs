import Head from 'next/head'
import { useDispatch } from 'react-redux'
import { modalReducer } from '@/redux/modal/modal.reducer'

const Profile = () => {
  const dispatch = useDispatch()

  const openModal = () => {
    const modalInfo = {
      title: 'This is sample modal',
      style: {
        width: 390,
        height: 260,
        fSize: 25,
      },
    }
    dispatch(modalReducer.openModal(modalInfo))
  }
  return (
    <div>
      <Head>
        <title>Profile | Next/React</title>
      </Head>
      <div className="mt-24">
        <h1 className="text-6xl font-bold underline">
          Hello world!
        </h1>
        <h1>This is Profile Page</h1>
        <button style={{width: '200px', height:'200px'}}
                onClick={openModal}></button>
      </div>
    </div>
  )
}
export default Profile
