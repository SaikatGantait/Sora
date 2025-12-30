// Mock Cloudinary uploader; if CLOUDINARY_URL exists, you could integrate real Cloudinary SDK.

const SAMPLE_VIDEO = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'

export async function uploadVideoMock(_filePath: string): Promise<string> {
  // Pretend upload by returning a unique URL
  return `${SAMPLE_VIDEO}?r=${Date.now()}`
}

export async function uploadImageMock(_filePath: string): Promise<string> {
  // Return a placeholder image URL with a varying seed
  return `https://picsum.photos/seed/${Date.now()}/800/600`
}
