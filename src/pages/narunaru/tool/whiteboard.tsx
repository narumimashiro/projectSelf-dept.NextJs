import Head from 'next/head'
import { useLayoutEffect, useState } from 'react' 
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import styles from '@/styles/pages/WhiteBoard.module.sass'

// MyComponent
import PenColorPalette from '@/components/ui_components/tool/pencolorpalette'
import CanvasBoard from '@/components/ui_components/tool/canvasboard'
import CanvasFuncButton from '@/components/ui_components/tool/canvasfuncbutton'

// 定数定義
// キャンバス設定系
const CANVASID = 'whiteboard'
const BLACK = '#0d0015'
const CANVAS_WIDTH = 1700
const CANVAS_HEIGHT = 960
const IMG_URL = ''

const WhiteBoard = () => {

  const [whiteBoard, setWhiteBoard] = useState<Canvas>()

  const getWhiteBoardSize = () => ({
    width: `${CANVAS_WIDTH}px`,
    height: `${CANVAS_HEIGHT}px`,
  })

  useLayoutEffect(() => {
    const canvas = new fabric.Canvas(CANVASID, {
      isDrawingMode: true,
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
      backgroundImage: IMG_URL,
    })
    canvas.freeDrawingBrush.color = BLACK
    setWhiteBoard(canvas)
  }, [])

  return (
    <div className="min-w-screen">
      <Head>
        <title>Tool | WhiteBoard</title>
        <meta name='discription' content='whiteboard you can hand writing'></meta>
      </Head>
      <div className="mt-20">
        <div className="flex justify-center text-center items-center text-2xl font-bold w-auto h-10">White Board</div>
        <div className={styles['white-board']}>
          <div className='border-2 border-green-200'
               style={getWhiteBoardSize()}
          >
            <CanvasBoard id={CANVASID}/>
          </div>
          <div className="w-1/6 h-auto">
            <PenColorPalette canvas={whiteBoard!}
                             penColor={BLACK}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
export default WhiteBoard

// 参考
// https://github.com/citrus-candy/handwritten-app