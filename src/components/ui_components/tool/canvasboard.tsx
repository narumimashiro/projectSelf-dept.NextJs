const CanvasBoard = (props: {id: string}) => {
  const canvasId = props.id

  return (
    <canvas className="w-full h-full" id={canvasId}/>
  )
}
export default CanvasBoard