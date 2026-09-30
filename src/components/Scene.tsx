// app/page.tsx or pages/index.tsx
'use client'

import Scene3D from '@/components/Model'

export default function Scene() {
  return (
    <section className="relative w-full min-h-[200vh]! bg-black">
      <Scene3D />
    </section>
  )
}