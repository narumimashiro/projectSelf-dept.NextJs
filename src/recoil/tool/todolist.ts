import { atom } from 'recoil'
import type { Task } from './types'

export const todoTask = atom<Array<Task>>({
  key: 'todotask',
  default: [
    {
      id: '',
      text: ''
    },
  ]
})

export const progressTask = atom<Array<Task>>({
  key: 'progresstask',
  default: [
    {
      id: '',
      text: ''
    },
  ]
})

export const doneTask = atom<Array<Task>>({
  key: 'donetask',
  default: [
    {
      id: '',
      text: ''
    },
  ]
})