import { useEffect, useState } from 'react'
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
export default PenColorPalette