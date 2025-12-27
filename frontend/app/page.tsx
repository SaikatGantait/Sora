import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Page() {
  return (
    <div className="flex flex-col items-center text-center gap-10 pt-20">
      <div className="max-w-3xl">
        <h1 className="heading-gradient text-5xl md:text-6xl font-extrabold tracking-tight">
          Create AI videos from templates — no prompts required
        </h1>
        <p className="mt-5 text-zinc-300/90 leading-relaxed">
          Design with layers like Canva, render like CapCut. SoraStudio turns templates into stunning AI-powered videos.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/templates" className="btn btn-primary">Try Editor <ArrowRight className="ml-2 h-4 w-4"/></Link>
          <Link href="/templates" className="btn btn-secondary">Browse Templates</Link>
          <Link href="/auth/signup" className="btn btn-secondary">Create account</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-12">
        <div className="card p-6 hover:border-accent/40 transition">
          <h3 className="text-lg font-semibold">Template-based</h3>
          <p className="text-zinc-400 mt-2">Swap text and images in curated templates. No prompting.</p>
        </div>
        <div className="card p-6 hover:border-accent/40 transition">
          <h3 className="text-lg font-semibold">Live preview</h3>
          <p className="text-zinc-400 mt-2">Use the built-in Remotion Player for real-time playback.</p>
        </div>
      </div>
    </div>
  )
}