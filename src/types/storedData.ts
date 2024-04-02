export type StoredDataItem = {
  id: number
  codeValue: string
  issueDate: string
  locationId: 1
}

export type StoredData = {
  cards: StoredDataItem[]
}
