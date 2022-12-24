import { useRecoilState } from 'recoil'
import { messageState } from '@/recoil/message/message'
const ComingSoon = () => {
  const [message, setMessage] = useRecoilState(messageState)

  const changeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({message: event.target.value})
  }

  return (
    <div className="w-full h-full">
      <h1 className="flex w-full h-3/4 justify-center items-center text-8xl font-bold text-red-500 font-sans">{message.message}</h1>
      <input className="text-center text-xl"
             type="text"
             value={message.message}
             onChange={changeMessage}/><br/>
    </div>
  )
}
export default ComingSoon