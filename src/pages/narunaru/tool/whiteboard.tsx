import Head from 'next/head'
import ReactSignatureCanvas from 'react-signature-canvas'

const WhiteBoard = () => {
  const getCanvasStyle = () => ({
    width: 1600,
    height: 800,
    border: '1px solid'
  })

  return (
    <div>
      <Head>
      <title>Tool | WhiteBoard</title>
      <meta name='discription' content='whiteboard you can hand writing'></meta>
      </Head>
      <div className='flex flex-col justify-center items-center mt-28'>
        <header>Temp White Board</header>
        <div style={getCanvasStyle()}>
          <ReactSignatureCanvas
            canvasProps={{width: 1600, height: 800}}
          />
        </div>
      </div>
    </div>
  )
}
export default WhiteBoard