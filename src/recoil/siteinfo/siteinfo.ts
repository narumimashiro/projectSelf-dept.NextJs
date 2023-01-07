import { atom } from 'recoil'
import * as SiteInfo from './types'

export const pageInfo = atom<SiteInfo.PageInfo>({
  key: 'pagetitle',
  default: {
    title: 'BTW Next/React',
    url: '',
  }
})

export const hashTag = atom<SiteInfo.HashTag>({
  key: 'hashtag',
  default: {
    hashtag: 'ぼっち・わーく'
  }
})