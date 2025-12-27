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

  // Fashion Promo
  await prisma.template.upsert({
    where: { id: 'fashion_promo' },
    update: {},
    create: {
      id: 'fashion_promo',
      name: 'Fashion Promo',
      duration: 12,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 12 },
        { type: 'text', text: 'NEW DROP', editable: true, fontSize: 72, color: '#ffffff', x: 80, y: 80 },
        { type: 'text', text: 'Winter 2025', editable: true, fontSize: 40, color: '#00e5ff', x: 82, y: 150 },
        { type: 'image', userUpload: true, x: 640, y: 220, width: 240, height: 240, src: 'https://placekitten.com/240/240' },
      ]),
    },
  })

  // Food Reel
  await prisma.template.upsert({
    where: { id: 'food_reel' },
    update: {},
    create: {
      id: 'food_reel',
      name: 'Food Reel',
      duration: 9,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 9 },
        { type: 'text', text: 'Chef Special', editable: true, fontSize: 54, color: '#ffeb3b', x: 100, y: 90 },
        { type: 'image', userUpload: true, x: 700, y: 100, width: 200, height: 200, src: 'https://placekitten.com/200/200' },
        { type: 'text', text: '$9.99', editable: true, fontSize: 48, color: '#ffffff', x: 720, y: 320 },
      ]),
    },
  })

  // Quote Motion
  await prisma.template.upsert({
    where: { id: 'quote_motion' },
    update: {},
    create: {
      id: 'quote_motion',
      name: 'Quote Motion',
      duration: 6,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 6 },
        { type: 'text', text: 'Believe you can and you\'re halfway there.', editable: true, fontSize: 36, color: '#ffffff', x: 100, y: 220 },
        { type: 'text', text: '—T. Roosevelt', editable: true, fontSize: 24, color: '#a1a1aa', x: 100, y: 280 },
      ]),
    },
  })

  // Real Estate Card
  await prisma.template.upsert({
    where: { id: 'real_estate_card' },
    update: {},
    create: {
      id: 'real_estate_card',
      name: 'Real Estate Card',
      duration: 10,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 10 },
        { type: 'image', userUpload: true, x: 540, y: 100, width: 360, height: 240, src: 'https://placekitten.com/360/240' },
        { type: 'text', text: '3 Bed • 2 Bath', editable: true, fontSize: 32, color: '#ffffff', x: 80, y: 120 },
        { type: 'text', text: '$450,000', editable: true, fontSize: 48, color: '#7c5cff', x: 80, y: 170 },
        { type: 'text', text: 'Open House Sat 1-4pm', editable: true, fontSize: 24, color: '#00e5ff', x: 80, y: 230 },
      ]),
    },
  })

  // Fitness Motivation
  await prisma.template.upsert({
    where: { id: 'fitness_motivation' },
    update: {},
    create: {
      id: 'fitness_motivation',
      name: 'Fitness Motivation',
      duration: 8,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 8 },
        { type: 'text', text: 'No Days Off', editable: true, fontSize: 64, color: '#ffffff', x: 120, y: 120 },
        { type: 'text', text: 'Push • Pull • Legs', editable: true, fontSize: 28, color: '#00e5ff', x: 124, y: 200 },
      ]),
    },
  })

  // Travel Vlog
  await prisma.template.upsert({
    where: { id: 'travel_vlog' },
    update: {},
    create: {
      id: 'travel_vlog',
      name: 'Travel Vlog',
      duration: 12,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 12 },
        { type: 'text', text: 'Exploring Kyoto', editable: true, fontSize: 52, color: '#ffffff', x: 80, y: 80 },
        { type: 'image', userUpload: true, x: 700, y: 300, width: 200, height: 120, src: 'https://placekitten.com/200/120' },
      ]),
    },
  })

  // Podcast Audiogram
  await prisma.template.upsert({
    where: { id: 'podcast_audiogram' },
    update: {},
    create: {
      id: 'podcast_audiogram',
      name: 'Podcast Audiogram',
      duration: 9,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 9 },
        { type: 'text', text: 'The AI Shift — Ep. 12', editable: true, fontSize: 36, color: '#ffffff', x: 80, y: 90 },
        { type: 'text', text: '"Designing with Generative Video"', editable: true, fontSize: 26, color: '#a1a1aa', x: 80, y: 140 },
        { type: 'image', userUpload: true, x: 720, y: 140, width: 180, height: 180, src: 'https://placekitten.com/180/180' },
      ]),
    },
  })

  // Product Showcase
  await prisma.template.upsert({
    where: { id: 'product_showcase' },
    update: {},
    create: {
      id: 'product_showcase',
      name: 'Product Showcase',
      duration: 10,
      previewUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      creatorName: 'SoraStudio',
      layers: JSON.stringify([
        { type: 'video', src: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4', start: 0, end: 10 },
        { type: 'image', userUpload: true, x: 580, y: 140, width: 280, height: 280, src: 'https://placekitten.com/280/280' },
        { type: 'text', text: 'UltraBlend X1', editable: true, fontSize: 54, color: '#7c5cff', x: 80, y: 120 },
        { type: 'text', text: 'Now 20% Off', editable: true, fontSize: 32, color: '#00e5ff', x: 82, y: 180 },
      ]),
    },
  })

  console.log('Seeded templates')
}

main().finally(async () => prisma.$disconnect())
