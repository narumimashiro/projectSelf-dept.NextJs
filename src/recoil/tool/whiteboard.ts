import { atom } from 'recoil'

export const penColor = atom<string>({
  key: 'pencolor',
  default: '#0d0015'
})