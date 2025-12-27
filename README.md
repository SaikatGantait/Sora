# SoraStudio

A visual, template-based AI video editor inspired by Canva + CapCut, designed to sit on top of AI video generation (Sora-like).

Tech stack
- Frontend: Next.js 14 (App Router), TypeScript, Tailwind CSS, Konva.js, Remotion Player
- Backend: Node.js + Express (TypeScript), Prisma (PostgreSQL), BullMQ (with in-memory fallback), Cloudinary (mock), JWT auth

Quick start
- Prereqs: Node 18+, pnpm or npm, PostgreSQL (or use sqlite fallback), optional Redis

1) Backend
- cd backend
- Copy .env.example to .env and adjust
- pnpm install
- pnpm prisma:generate
- pnpm prisma:migrate
- pnpm prisma:seed
- pnpm dev

2) Frontend
- cd frontend
- Copy .env.example to .env.local and adjust
- pnpm install
- pnpm dev

Open http://localhost:3000

Demo flow
- Visit landing page
- Sign up (email + password)
- Browse Templates, pick one
- Editor: drag/resize image layers, edit text, live preview
- Save edits
- Click Render -> creates a render job (mock Sora)
- Check job status -> when completed, a video URL is returned (mock Cloudinary)

Environment variables
See backend/.env.example and frontend/.env.example

Notes
- Rendering uses a mock service by default. If you have Redis/Remotion configured, set REMOTION_ENABLED and REDIS_URL.
- Cloudinary is mocked to local URLs when CLOUDINARY_URL is not provided.
- Templates are seeded in the database. Frontend also includes sample templates as fallback.
