import Head from 'next/head'
import { useLayoutEffect, useEffect, useState } from 'react' 
import { fabric } from 'fabric'
import { Canvas } from 'fabric/fabric-impl'
import styles from '@/styles/pages/WhiteBoard.module.sass'

// 定数定義
// ペンの色関連
const WHITE = '#ffffff'
const BLACK = '#0d0015'
const BLUE = '#0000ff'
const RED = '#ff0000'
const GREEN = '#008000'
const ORANGE = '#ffff00'
const PINK = '#ff1493'
const VIOLET = '#9400d3'
// キャンバス設定系
const CANVASID = 'whiteboard'
const CANVAS_WIDTH = 1700
const CANVAS_HEIGHT = 960
const IMG_URL = ''

interface PenColorPaletteProps {
  canvas: Canvas,
  penColor: string
}

const PenColorPalette = (props: PenColorPaletteProps) => {

  const {canvas, penColor} = props
  const [colorPen, setColorPen] = useState(penColor)

  useEffect(() => {
    if(canvas != undefined) {
      canvas.freeDrawingBrush.color = colorPen
    }
  }, [canvas, colorPen])

  const changePenColor = (color: string) => {
    setColorPen(color)
  }
  
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <header className="text-2xl font-bold underline">Pen Color</header>
      <div className="w-full h-44 mt-4 grid grid-cols-3 place-items-center">
        <button className={`${styles['color-pen-btn']} ${styles.black}`}
                onClick={() => changePenColor(BLACK)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.blue}`}
                onClick={() => changePenColor(BLUE)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.red}`}
                onClick={() => changePenColor(RED)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.green}`}
                onClick={() => changePenColor(GREEN)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.orange}`}
                onClick={() => changePenColor(ORANGE)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.pink}`}
                onClick={() => changePenColor(PINK)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.violet}`}
                onClick={() => changePenColor(VIOLET)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.white}`}
                onClick={() => changePenColor(WHITE)}
        />
        <button className={`${styles['color-pen-btn']} ${styles.rainbow}`}
                onClick={() => changePenColor('#00ffff')}
        />
      </div>
    </div>
  )
}
const CanvasBoard = (props: {id: string}) => {
  const canvasId = props.id

  return (
    <canvas className="w-full h-full" id={canvasId}/>
  )
}
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