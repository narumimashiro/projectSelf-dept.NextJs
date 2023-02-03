import Head from 'next/head'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { SignatureComponent } from '@syncfusion/ej2-react-inputs'
import { penColor } from '@/recoil/tool/whiteboard'
import styles from '@/styles/pages/WhiteBoard.module.sass'
import Sakura from '@/components/ui_components/sakura'

// 定数定義
const WHITE = '#ffffff'
const BLACK = '#0d0015'
const BLUE = '#0000ff'
const RED = '#ff0000'
const GREEN = '#008000'

const PenColorPalette = () => {

  const setPenColor = useSetRecoilState(penColor)

  const changePenColor = (color: string) => {
    setPenColor(color)
  }
  
  return (
    <div className="flex flex-col justify-center items-center text-center">
      <header className="text-2xl font-bold">Pen Color</header>
      <div className="w-full h-60 grid grid-cols-2 place-items-center">
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
      </div>
    </div>
  )
}
const WhiteBoard = () => {

  const colorPen = useRecoilValue(penColor)

  return (
    <div className="min-w-screen min-h-screen">
      <Head>
      <title>Tool | WhiteBoard</title>
      <meta name='discription' content='whiteboard you can hand writing'></meta>
      </Head>
      <Sakura/>
      <div className="mt-36">
        <div className="w-auto h-1/6"></div>
        <div className={styles['white-board']}>
          <div className='w-5/6 h-full border-2 border-green-200'>
            <SignatureComponent className='w-full h-full'
                                backgroundColor="white"
                                strokeColor={colorPen}
            >
            </SignatureComponent>
          </div>
          <div className="w-1/6 h-full">
            <PenColorPalette/>
          </div>
        </div>
        <div className="w-auto h-1/6"></div>
      </div>
    </div>
  )
}
export default WhiteBoard