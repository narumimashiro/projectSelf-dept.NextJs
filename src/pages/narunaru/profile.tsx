import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { RootState } from '@/redux/store'

const profile = () => {
  const dispatch = useDispatch()

  const openModal = () => {
    const modal_info = {
      title: 'profile modal',
      style: {
        width: 600,
        height: 400
      }
    }
    dispatch(modalReducer.openModal(modal_info))
  }
  return (
    <div>
      <Head>
        <title>Next/React | Profile</title>
      </Head>
      <h1>This is Profile Page</h1>
      <button style={{width: '20px', height:'20px'}}
              onClick={openModal}></button>
    </div>
  )
}
export default profile