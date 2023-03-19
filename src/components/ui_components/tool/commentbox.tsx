import { getDateStringYMDHMS } from '@/lib/commonstring'

interface Props {
  index: number,
  id: string,
  date: string,
  comment: string,
}

const CommentBox = (props: Props) => {

  return (
    <div className="w-full h-32 bg-white">
      <div className="w-auto h-8 ml-8 mt-4">
        <span className="txt-xl">{`${(props.index + 1)} >`}</span>
        <span className="txt-xl ml-4">{props.id}</span>
        <span className="txt-xl ml-8">{getDateStringYMDHMS(props.date)}</span>
      </div>
      <div className="w-auto h-12 ml-8 mt-4 mb-4">
        <p className="txt-xl ml-4">{props.comment}</p>
      </div>
    </div>
  )
}
export default CommentBox