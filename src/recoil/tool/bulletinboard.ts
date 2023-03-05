import { atom } from 'recoil'
import { createRandomId } from '@/lib/commonstring'

const ID_LENGTH = 16

export const userId = atom<string>({
  key: 'userid',
  // default: createRandomId(ID_LENGTH)
  default: 'prsk'
})