// Mock Cloudinary uploader; if CLOUDINARY_URL exists, you could integrate real Cloudinary SDK.

const SAMPLE_VIDEO = 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4'

export async function uploadVideoMock(_filePath: string): Promise<string> {
  // Pretend upload by returning a unique URL
  return `${SAMPLE_VIDEO}?r=${Date.now()}`
}
