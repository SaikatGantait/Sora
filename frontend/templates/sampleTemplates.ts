import { Template } from '../lib/types'

export const sampleTemplates: Template[] = [
  {
    id: 'travel_reel',
    name: 'Travel Reel',
    duration: 10,
    previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
    creatorName: 'SoraStudio',
    layers: [
      { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 10 },
      { type: 'image', userUpload: true, x: 200, y: 300, width: 300, height: 300, src: 'https://placekitten.com/300/300' },
      { type: 'text', text: 'My Journey', editable: true, fontSize: 48, color: '#ffffff', x: 100, y: 100 },
    ],
  }
]
