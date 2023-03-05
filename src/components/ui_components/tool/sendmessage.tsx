
interface Props {
  message: string,
  callbackChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  callbackClick: () => void
}

const SendMessage = (props: Props) => {

  const temp = () => {
    console.log('push')
  }

  return (
    <div className="flex flex-col w-full h-full">
      <textarea className="w-full h-40 border-2 resize-none"
                placeholder="Enter Text"
                value={props.message}
                onChange={(e) => props.callbackChange(e)}
      />
      <div className="text-right">
        <button className="w-12 h-8 bg-gray-200 mt-4 mr-8"
                onClick={props.callbackClick}>Send</button>
      </div>
    </div>
  )
}
export default SendMessage