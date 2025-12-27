export type VideoLayer = {
  type: 'video'
  src: string
  start: number
  end: number
}
export type ImageLayer = {
  type: 'image'
  userUpload?: boolean
  x: number
  y: number
  width: number
  height: number
  src?: string
  start?: number
  end?: number
}
export type TextLayer = {
  type: 'text'
  text: string
  editable?: boolean
  fontSize: number
  color: string
  x: number
  y: number
  start?: number
  end?: number
}
export type Layer = VideoLayer | ImageLayer | TextLayer

export type Template = {
  id: string
  name: string
  duration: number
  layers: Layer[]
  previewUrl?: string
  creatorName?: string
}