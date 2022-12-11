import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { modalReducer } from '@/redux/modal/modal.reducer'
import { RootState } from '@/redux/store'

const profile = () => {
  const message = useSelector((state: RootState) => state.modal.disp_message)
  const dispatch = useDispatch()
  return (
    <div>
      <Head>
        <title>Next/React | Profile</title>
      </Head>
      <h1>This is Profile Page</h1>
      <h2>message : { message }</h2>
      <button style={{width: '20px', height:'20px'}}
              onClick={() => dispatch(modalReducer.openModal())}></button>
    </div>
  )
}
export default profile