import { onMounted } from 'vue'
import type { StoredData, StoredDataItem } from '../types/storedData'

const targetLocalStorageKey = 'data'

export const useStore = () => {
  onMounted(() => {
    if (!getStoredData()) {
      initStore()
    }
  })

  const initStore = () => {
    localStorage.setItem(
      targetLocalStorageKey,
      JSON.stringify({
        cards: []
      })
    )
  }

  const getStoredData = (): StoredData | null => {
    const storedStr = localStorage.getItem(targetLocalStorageKey)

    if (!storedStr) {
      return null
    }

    return JSON.parse(storedStr)
  }

  const getTargetItem = (id: StoredDataItem['id']): StoredDataItem | null => {
    const storedData = getStoredData()
    if (!storedData?.cards) return null

    return storedData.cards.find((item) => item.id === id) ?? null
  }

  const getTargetItemByCode = (
    codeValue: StoredDataItem['codeValue']
  ): StoredDataItem | null => {
    const storedData = getStoredData()
    if (!storedData?.cards) return null

    return storedData.cards.find((item) => item.codeValue === codeValue) ?? null
  }

  const addItem = (payload: Omit<StoredDataItem, 'id'>) => {
    const storedData = getStoredData()

    if (!storedData?.cards) return

    storedData.cards.push({
      id: storedData.cards.length + 1,
      ...payload
    })
    localStorage.setItem(targetLocalStorageKey, JSON.stringify(storedData))
  }

  const changeItemIssueDate = (payload: {
    id: StoredDataItem['id']
    issueDate: StoredDataItem['issueDate']
  }) => {
    const storedData = getStoredData()

    if (!storedData) return

    const targetItem = storedData.cards.find((item) => item.id === payload.id)

    if (!targetItem) return

    targetItem.issueDate = payload.issueDate

    localStorage.setItem(
      targetLocalStorageKey,
      JSON.stringify({
        cards: storedData.cards
          .filter((item) => item.id !== payload.id)
          .concat([targetItem])
      })
    )
  }

  const deleteItem = (id: StoredDataItem['id']) => {
    const storedData = getStoredData()
    if (!storedData) return

    const payload = storedData.cards.filter((item) => item.id !== id)

    localStorage.setItem(
      targetLocalStorageKey,
      JSON.stringify({
        cards: payload
      })
    )
  }

  return {
    initStore,
    getStoredData,
    getTargetItem,
    getTargetItemByCode,
    addItem,
    changeItemIssueDate,
    deleteItem
  }
}
