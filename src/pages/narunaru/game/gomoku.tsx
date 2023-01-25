import Head from 'next/head'
import { ReactElement, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { gomokuData } from '@/recoil/game/gameinfo'
import styles from '@/styles/pages/GameGomoku.module.sass'
import GameHeader from '@/components/ui_components/gameheader'
import Sakura from '@/components/ui_components/sakura'

// Modalウィンドウ用
import { useDispatch } from 'react-redux'
import { modalReducer } from '@/redux/modal/modal.reducer'

// 定数定義
const BOARDSIZE = 17
const COUNT5 = 5
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
      {props.gridState == EMPTY && <p className='w-full h-full hover:bg-gray-100'></p>}
      {props.gridState == P1    && <p className='w-full h-full bg-pink-300'></p>}
      {props.gridState == P2    && <p className='w-full h-full bg-blue-300'></p>}
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
            gridState={el}
            clickEvent={() => props.clickEvent(xIndex, yIndex)}
          />
        ))
      ))}
    </div>
  )
}

const Gomoku = () => {
  const [gameData, setGameData] = useRecoilState(gomokuData)
  const dispatch = useDispatch()

  const initBoard = () => {
    setGameData({p1IsNext: true,
                 currentBoard: Array(BOARDSIZE).fill(Array(BOARDSIZE).fill(0)),
                 previousBoard: Array(BOARDSIZE).fill(Array(BOARDSIZE).fill(0))})
  }

  const restartGame = () => {
    initBoard()
    dispatch(modalReducer.closeModal())
  }

  const handleClick = (x: number, y: number) => {
    if(gameData.currentBoard[y][x] != EMPTY) return
    
    // 多次元配列は値渡しが出来ないため以下で対応
    const current: Array<Array<number>> = JSON.parse(JSON.stringify(gameData.currentBoard))
    current[y][x] = gameData.p1IsNext ? P1 : P2
    setGameData({p1IsNext: !gameData.p1IsNext,
                 currentBoard: current,
                 previousBoard: gameData.currentBoard})
  }

  useEffect(() => {
    if(judgeWinner(gameData.currentBoard)) {
      const modalInfo = {
        title: 'Congratulations!!',
        buttonItems: [{
          btnTitle: 'Restart',
          callback: () => restartGame(),
        }],
        component: 'gomokuresult'
      }
      dispatch(modalReducer.openModal(modalInfo))
    }
  }, [gameData])

  return (
    <>
      <Head>
        <title>Game | 五目並べ</title>
        <meta name='discription' content='game gomoku'></meta>
      </Head>
      <Sakura/>
      <div className='w-full min-h-screen'>
        <GameHeader gameTitle='五目並べ'
                    clickToBack={() => initBoard()}/>
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

const judgeWinner = (board: Array<Array<number>>) => {

  const checkBeside = (x: number, y: number) => {
    if(board[y][x] == EMPTY) { return false }
    // 横並び判定
    if((board[y][x + 1] == board[y][x]) &&
       (board[y][x + 2] == board[y][x]) &&
       (board[y][x + 3] == board[y][x]) &&
       (board[y][x + 4] == board[y][x])) {
        return true  // 5つ揃っている
    }
    return false
  }

  const checkVertical = (x: number, y: number) => {
    if(board[y][x] == EMPTY) { return false }
    // 縦並び判定
    if((board[y + 1][x] == board[y][x]) &&
       (board[y + 2][x] == board[y][x]) &&
       (board[y + 3][x] == board[y][x]) &&
       (board[y + 4][x] == board[y][x])) {
        return true  // 5つ揃っている
    }
    return false
  }

  const checkLowerRight = (x: number, y: number) => {
    if(board[y][x] == EMPTY) { return false }
    // 斜め判定(右下方向)
    if((board[y + 1][x + 1] == board[y][x]) &&
       (board[y + 2][x + 2] == board[y][x]) &&
       (board[y + 3][x + 3] == board[y][x]) &&
       (board[y + 4][x + 4] == board[y][x])) {
        return true  // 5つ揃っている
    }
    return false
  }

  const checkLowerLeft = (x: number, y: number) => {
    if(board[y + 4][x] == EMPTY) { return false }
    // 斜め判定(左下方向)
    if((board[y + 3][x + 1] == board[y + 4][x]) &&
       (board[y + 2][x + 2] == board[y + 4][x]) &&
       (board[y + 1][x + 3] == board[y + 4][x]) &&
       (board[y    ][x + 4] == board[y + 4][x])) {
     return true  // 5つ揃っている
    }
    return false
  }

  for(let y = 0; y <= BOARDSIZE - COUNT5; ++y) {
    for(let x = 0; x <= BOARDSIZE - COUNT5; ++x) {
      if(checkBeside(x, y) ||
         checkVertical(x, y) ||
         checkLowerRight(x, y) ||
         checkLowerLeft(x, y)) {
          return true  // 勝者決定
      }
    }
  }

  return false  // 勝敗決まらず
}

Gomoku.getLayout = (Gomoku: ReactElement) => {
  return (
    <>
      { Gomoku }
    </>
  )
}
export default Gomoku