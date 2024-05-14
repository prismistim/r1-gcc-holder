export type StoredDataItem = {
  id: number
  codeValue: string
  issueDate: string
  locationId: 1
  isDummy: boolean
}

export type StoredData = {
  cards: StoredDataItem[]
}
