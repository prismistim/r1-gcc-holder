import { onMounted } from 'vue'
import type { StoredData, StoredDataItem } from '../types/storedData'

export const useStore = () => {
  onMounted(() => {
    if (!getStoredData()) {
      initStore()
    }
  })

  const initStore = () => {
    localStorage.setItem(
      'card',
      JSON.stringify({
        cards: [],
      }),
    )
  }

  const getStoredData = (): StoredData | null => {
    const storedStr = localStorage.getItem('card')

    if (!storedStr) {
      return null
    }

    return JSON.parse(storedStr)
  }

  const setData = (payload: Omit<StoredDataItem, 'id'>) => {
    const storedData = getStoredData()

    if (!storedData) return

    storedData.cards.push({
      id: storedData.cards.length + 1,
      ...payload
    })
    localStorage.setItem('card', JSON.stringify(storedData))
  }

  const deleteItem = (id: StoredDataItem['id']) => {
    const storedData = getStoredData()
    if (!storedData) return

    const payload = storedData.cards.filter((item) => item.id !== id)

    localStorage.setItem('card', JSON.stringify({
      cards: payload
    }))
  }

  return { getStoredData, setData, deleteItem }
}
