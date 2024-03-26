export type QR = {
  boundingBox: BoundingBox
  rawValue: string
  format: string
  cornerPoints: CornerPoint[]
}

type CornerPoint = {
  x: number
  y: number
}

type BoundingBox = {
  x: number
  y: number
  width: number
  height: number
  top: number
  right: number
  bottom: number
  left: number
}
