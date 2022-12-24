import { atom } from 'recoil'
import type { MessageRecoil } from './types'

export const messageState = atom<MessageRecoil>({
  key: 'message',
  default: {
    message: 'Coming Soon'
  }
})