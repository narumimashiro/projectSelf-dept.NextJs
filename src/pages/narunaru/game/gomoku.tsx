import Head from 'next/head'
import { ReactElement } from 'react'

import GameHeader from '@/components/ui_components/gameheader'

// 定数定義
const BOARD_SIZE = 17

// interface GameData {
//   previousBoard: Array<number>[],
//   currentBoard:Array<number>[],
//   isPlayer1Turn: boolean,
// }

// class GameControl extends React.Component {
//   constructor(props: GameData) {
//     super(props)
//     this.state = {
//       previousBoard: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)),
//       currentBoard: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null))
//     }
//   }
// }


const Gomoku = () => {
  return (
    <>
      <Head>
        <title>Game | 五目並べ</title>
        <meta name='discription' content='game gomoku'></meta>
      </Head>
      <div className='w-full min-h-screen'>
        <GameHeader gameTitle='五目並べ'/>
        <h1 className='flex justify-center'>Hello Gomoku</h1>
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