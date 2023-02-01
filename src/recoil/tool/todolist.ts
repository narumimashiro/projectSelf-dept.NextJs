import { atom } from 'recoil'
import type { Task } from './types'

export const todoTask = atom<Array<Task>>({
  key: 'todotask',
  default: []
})

export const progressTask = atom<Array<Task>>({
  key: 'progresstask',
  default: []
})

export const doneTask = atom<Array<Task>>({
  key: 'donetask',
  default: []
})

export const countTask = atom<number>({
  key: 'taskcounter',
  default: 0
})