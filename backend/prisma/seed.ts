import 'dotenv/config'
import { prisma } from '../src/utils/prisma.js'
import { hashPassword } from '../src/services/password.js'

async function main() {
  // Ensure a demo user exists for easy login
  const demoPassword = await hashPassword('demo1234')
  await prisma.user.upsert({
    where: { email: 'demo@sora.local' },
    update: {},
    create: { name: 'Demo User', email: 'demo@sora.local', passwordHash: demoPassword },
  })
  await prisma.template.upsert({
    where: { id: 'travel_reel' },
    update: {},
    create: {
      id: 'travel_reel',
      name: 'Travel Reel',
      duration: 10,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 10 },
        { type: 'image', userUpload: true, x: 200, y: 300, width: 300, height: 300, src: 'https://placekitten.com/300/300' },
        { type: 'text', text: 'My Journey', editable: true, fontSize: 48, color: '#ffffff', x: 100, y: 100 },
      ]),
    },
  })

  await prisma.template.upsert({
    where: { id: 'startup_ad' },
    update: {},
    create: {
      id: 'startup_ad',
      name: 'Startup Ad',
      duration: 8,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 8 },
        { type: 'text', text: 'Launch Day', editable: true, fontSize: 64, color: '#7c5cff', x: 120, y: 120 },
      ]),
    },
  })

  console.log('Seeded templates')
}

main().finally(async () => prisma.$disconnect())
