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
      <h1>This is Profile Page</h1>
      <button style={{width: '20px', height:'20px'}}
              onClick={openModal}></button>
    </div>
  )
}
export default Profile