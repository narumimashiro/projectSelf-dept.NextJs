import Head from 'next/head'
import { ReactElement } from 'react'
import { useRecoilState } from 'recoil'
import { gomokuData } from '@/recoil/game/gameinfo'
import styles from '@/styles/pages/GameGomoku.module.sass'
import GameHeader from '@/components/ui_components/gameheader'

// 定数定義
const BOARD_SIZE = 17
const EMPTY = 0
const P1 = 1
const P2 = 2

interface BoardInfo {
  boardState: Array<Array<number>>,
  clickEvent: (x: number, y:number) => void
}

interface GridInfo {
  gridState: number,
  clickEvent: () => void
}
const GomokuGrid = (props: GridInfo) => {

  return (
    <div className='flex w-10 h-10 border text-center justify-center items-center'
       onClick={props.clickEvent}
    >
      {props.gridState == EMPTY && <p className='w-full h-full hover:bg-gray-200'></p>}
      {props.gridState == P1 && <p className='w-full h-full bg-pink-300'></p>}
      {props.gridState == P2 && <p className='w-full h-full bg-blue-300'></p>}
    </div>
  )
}

const GomokuBoard = (props: BoardInfo) => {
  return (
    <div className={styles['gomoku-board']}>
      {props.boardState.map((rowArray, yIndex) => (
        rowArray.map((el, xIndex) => (
          <GomokuGrid
            key={xIndex}
            gridState={props.boardState[xIndex][yIndex]}
            clickEvent={() => props.clickEvent(xIndex, yIndex)}
          />
        ))
      ))}
    </div>
  )
}

const Gomoku = () => {
  const [gameData, setGameData] = useRecoilState(gomokuData)

  const handleClick = (x: number, y: number) => {
    if(gameData.currentBoard[x][y] != EMPTY) return
    
    // 多次元配列は値渡しが出来ないため以下で対応
    const current: Array<Array<number>> = JSON.parse(JSON.stringify(gameData.currentBoard))
    current[x][y] = gameData.p1IsNext ? P1 : P2
    setGameData({p1IsNext: !gameData.p1IsNext,
                currentBoard: current,
                previousBoard: gameData.currentBoard})
  }

  return (
    <>
      <Head>
        <title>Game | 五目並べ</title>
        <meta name='discription' content='game gomoku'></meta>
      </Head>
      <div className='w-full min-h-screen'>
        <GameHeader gameTitle='五目並べ'/>
        <div className='h-10 text-center text-2xl mt-10'>
          Next Player : {gameData.p1IsNext ? <span className='text-pink-300 font-bold'>Player1</span>
                                           : <span className='text-blue-300 font-bold'>Player2</span>}
        </div>
        <div className='flex justify-center items-center'>
          <GomokuBoard
            boardState={gameData.currentBoard}
            clickEvent={(x, y) => handleClick(x, y)}
          />
        </div>
      </div>
    </>
  )
}
Gomoku.getLayout = (Gomoku: ReactElement) => {
  return (
    <>
      { Gomoku }
    </>
  )
}
export default Gomoku