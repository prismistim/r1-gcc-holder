import { Prefecture } from './prefecture'

export type Location = {
  id: number
  prefId: Prefecture['id']
  name: string
}

export const locations: Location[] = [
  {
    id: 1,
    prefId: 11,
    name: 'ららぽーと新三郷',
  },
  {
    id: 2,
    prefId: 27,
    name: '堺駅前',
  },
  {
    id: 3,
    prefId: 14,
    name: '横浜駅西口',
  },
  {
    id: 4,
    prefId: 29,
    name: '奈良 ミ・ナーラ',
  },
  {
    id: 5,
    prefId: 13,
    name: '吉祥寺',
  },
]
