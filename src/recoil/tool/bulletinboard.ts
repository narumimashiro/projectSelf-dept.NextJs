import { atom } from 'recoil'
import { createRandomString } from '@/lib/commonstring'
import { CommentData, UID } from './types'

const ID_LENGTH = 16

export const isChange = atom<boolean>({
  key: 'ischange',
  default: true
})

export const userId = atom<string>({
  key: 'userid',
  default: `${createRandomString(ID_LENGTH)}`
})

export const commentData = atom<Array<UID & CommentData>>({
  key: 'commentdata',
  default: [
    {
      uid: '',
      user: '',
      date: '',
      comment: ''
    }
  ]
})