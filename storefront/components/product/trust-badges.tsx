import { ShieldCheck, RotateCcw, Truck, Award } from 'lucide-react'

const badges = [
  {
    icon: ShieldCheck,
    title: '30-Day Guarantee',
    desc: 'No results? Full refund. No questions.',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    desc: 'On all orders over $60. Fast delivery.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    desc: '30-day hassle-free return window.',
  },
  {
    icon: Award,
    title: 'Clinically Tested',
    desc: '93% saw improvement in 4 weeks.',
  },
]

export default function TrustBadges() {
  return (
    <div className="grid grid-cols-2 gap-3 py-4 border-t border-border/60">
      {badges.map((b) => (
        <div key={b.title} className="flex items-start gap-2.5">
          <b.icon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: '#8B3A5A' }} strokeWidth={2} />
          <div>
            <p className="text-xs font-semibold text-foreground leading-tight">{b.title}</p>
            <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{b.desc}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
