import { atom } from 'recoil'
import * as GameData from './types'

// 定数定義
const BOARD_SIZE = 17

export const gomokuData = atom<GameData.GomokuData>({
  key: 'gomokudata',
  default: {
    p1IsNext: true,
    currentBoard: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0)),
    previousBoard: Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(0)),
  }
})