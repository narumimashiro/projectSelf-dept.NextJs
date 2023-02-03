import Head from 'next/head'
import { SignatureComponent } from '@syncfusion/ej2-react-inputs'

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
        <header>White Board</header>
        <div className="w-2/3 h-1/2">
          <SignatureComponent className="w-full h-full"
                              backgroundColor="#eaf4fc"
          >
            
          </SignatureComponent>
        </div>
      </div>
    </div>
  )
}
export default WhiteBoard