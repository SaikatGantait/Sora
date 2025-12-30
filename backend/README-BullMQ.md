BullMQ + Redis (optional)

- Set REDIS_URL in backend/.env to enable BullMQ. Example:
  REDIS_URL=redis://localhost:6379

- When enabled, the API uses BullMQ for /render jobs and reports progress from the queue.
- A Worker runs in-process to process jobs. For production, run a separate worker process.

Commands (local Redis via Docker):
- docker run -p 6379:6379 --name sora-redis -d redis:7
- Set REDIS_URL=redis://localhost:6379 and restart backend.
