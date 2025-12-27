// Mock renderer that pretends to render with Remotion and uploads to Cloudinary (mock)
import { uploadVideoMock } from './cloudinary.js'

export async function renderVideoMock(_payload: any): Promise<string> {
  // simulate 2.5s render time
  await new Promise((r) => setTimeout(r, 2500))
  // In a real implementation, you would render to a local MP4 file and upload it.
  // Here, just return a sample video URL via the mock uploader.
  return uploadVideoMock('local-render.mp4')
}
