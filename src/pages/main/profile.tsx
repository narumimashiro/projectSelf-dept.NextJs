import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import { reducers } from '@/redux/modal/modal.reducer'
import { RootState } from '@/redux/store'

const profile = () => {
  const message = useSelector((state: RootState) => state.modal.disp_message)
  const dispatch = useDispatch()
  const style = useSelector((state: RootState) => state.modal.modal_style)
  console.log({...style})
  return (
    <div>
      <Head>
        <title>Next/React | Profile</title>
      </Head>
      <h1>This is Profile Page</h1>
      <h2>message : { message }</h2>
      <button onClick={() => dispatch(reducers.dispMessage('button click'))} 
              style={{width: '390px', height: '260px'}}>useDispatch
      </button>
      <button onClick={() => dispatch(reducers.modalWinSize({width: 39, height:39}))} 
              style={{width: '390px', height: '260px'}}>getStyle
      </button>
    </div>
  )
}
export default profile