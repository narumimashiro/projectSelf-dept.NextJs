import { atom } from 'recoil'
import { createRandomId } from '@/lib/commonstring'

const ID_LENGTH = 16

export const userUid = atom<string>({
  key: 'useruid',
  default: createRandomId(ID_LENGTH)
})