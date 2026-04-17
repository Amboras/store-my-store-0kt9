'use client'

import { useEffect, useState } from 'react'
import { Clock, Flame } from 'lucide-react'

interface UrgencyBarProps {
  stockLeft?: number
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

export default function UrgencyBar({ stockLeft = 47 }: UrgencyBarProps) {
  // Countdown to midnight (end of "sale")
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 })

  useEffect(() => {
    const calcTime = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)
      const diff = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000))
      const h = Math.floor(diff / 3600)
      const m = Math.floor((diff % 3600) / 60)
      const s = diff % 60
      setTimeLeft({ h, m, s })
    }
    calcTime()
    const id = setInterval(calcTime, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="rounded-xl overflow-hidden border border-[#8B3A5A]/20">
      {/* Stock row */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#F7EEF2]">
        <Flame className="h-4 w-4 flex-shrink-0" style={{ color: '#8B3A5A' }} />
        <p className="text-xs font-semibold text-foreground">
          Only <span className="text-[#8B3A5A]">{stockLeft} units</span> left at this price — high demand this week
        </p>
      </div>
      {/* Countdown row */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#8B3A5A]">
        <Clock className="h-4 w-4 text-white/80 flex-shrink-0" />
        <p className="text-xs text-white/90 font-medium flex items-center gap-1.5">
          Sale ends in
          <span className="font-mono font-bold text-white tracking-tight">
            {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
          </span>
        </p>
      </div>
    </div>
  )
}
