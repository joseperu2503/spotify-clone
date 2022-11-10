import { atom, selectorFamily } from 'recoil'

// usado por que no tengo spotify premium
// export const currentTrackIdState = atom({
//   key: 'currentTrackIdState',
//   default: '0v1XpBHnsbkCn7iJ9Ucr1l'
// })

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: null
})

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false
})
