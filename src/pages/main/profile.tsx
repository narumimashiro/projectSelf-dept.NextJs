import { useSelector, useDispatch } from 'react-redux'
import { dispMessage } from '@/redux/modal/modal.reducer'

const profile = () => {
  const message = useSelector((state: any) => state.modal.disp_message)
  const dispatch = useDispatch()
  return (
    <div>
      <h1>This is Profile Page</h1>
      <h2>message : { message }</h2>
      <button onClick={() => dispatch(dispMessage('button click'))} style={{width: '390px', height: '260px'}}>useDispatch</button>
    </div>
  )
}
export default profile