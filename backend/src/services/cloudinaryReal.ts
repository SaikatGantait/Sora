import crypto from 'crypto'

const cloudName = process.env.CLOUDINARY_CLOUD_NAME
const apiKey = process.env.CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

export function isCloudinaryConfigured() {
  return !!(cloudName && apiKey && apiSecret)
}

export function createSignature() {
  if (!isCloudinaryConfigured()) return null
  const timestamp = Math.floor(Date.now() / 1000)
  const folder = 'sorastudio'
  // String to sign must be params sorted and concatenated with & and then api_secret
  // Here we sign only folder and timestamp for a simple upload
  const toSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
  const signature = crypto.createHash('sha1').update(toSign).digest('hex')
  return { signature, timestamp, apiKey, cloudName, folder }
}
