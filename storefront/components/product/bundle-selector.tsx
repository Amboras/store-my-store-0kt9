'use client'

import { useState } from 'react'
import { useCart } from '@/hooks/use-cart'
import { toast } from 'sonner'
import { Check, Loader2, Package, Star, Zap } from 'lucide-react'
import { trackAddToCart } from '@/lib/analytics'

interface BundleOption {
  label: string
  tag?: string
  tagColor?: string
  description: string
  price: string
  priceNote?: string
  variantId: string
  priceCents: number
  icon: React.ElementType
}

interface BundleSelectorProps {
  singleVariantId: string
  bundleVariantId: string
}

export default function BundleSelector({ singleVariantId, bundleVariantId }: BundleSelectorProps) {
  const [selected, setSelected] = useState<'single' | 'bundle'>('single')
  const [justAdded, setJustAdded] = useState(false)
  const { addItem, isAddingItem } = useCart()

  const options: BundleOption[] = [
    {
      label: '1x SculptGlow Massager',
      description: 'Device + USB-C cable + travel pouch',
      price: '$59.00',
      priceNote: 'Was $89',
      variantId: singleVariantId,
      priceCents: 5900,
      icon: Zap,
    },
    {
      label: 'Pro Bundle — Duo Pack',
      tag: 'Best Value',
      tagColor: 'bg-[#8B3A5A] text-white',
      description: '2 devices + Sculpt Oil + travel pouches',
      price: '$99.00',
      priceNote: 'Save $39',
      variantId: bundleVariantId,
      priceCents: 9900,
      icon: Package,
    },
  ]

  const activeOption = options.find((o) => o.variantId === (selected === 'single' ? singleVariantId : bundleVariantId))!

  const handleAdd = () => {
    if (!activeOption.variantId) return
    addItem(
      { variantId: activeOption.variantId, quantity: 1 },
      {
        onSuccess: () => {
          setJustAdded(true)
          toast.success('Added to bag')
          trackAddToCart('', activeOption.variantId, 1, activeOption.priceCents)
          setTimeout(() => setJustAdded(false), 2200)
        },
        onError: (err: Error) => {
          toast.error(err.message || 'Failed to add')
        },
      }
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">Choose Your Set</p>

      <div className="space-y-3">
        {options.map((opt) => {
          const isSel = (selected === 'single' && opt.variantId === singleVariantId) ||
                        (selected === 'bundle' && opt.variantId === bundleVariantId)
          return (
            <button
              key={opt.variantId}
              onClick={() => setSelected(opt.variantId === singleVariantId ? 'single' : 'bundle')}
              className={`w-full flex items-center gap-4 p-4 border-2 rounded-xl text-left transition-all ${
                isSel
                  ? 'border-[#8B3A5A] bg-[#F7EEF2]'
                  : 'border-border hover:border-[#C4748E]'
              }`}
            >
              {/* Radio dot */}
              <span className={`flex-shrink-0 h-5 w-5 rounded-full border-2 flex items-center justify-center ${isSel ? 'border-[#8B3A5A]' : 'border-border'}`}>
                {isSel && <span className="h-2.5 w-2.5 rounded-full bg-[#8B3A5A]" />}
              </span>

              {/* Icon */}
              <span className="flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: isSel ? '#8B3A5A' : '#F7EEF2' }}>
                <opt.icon className="h-4 w-4" style={{ color: isSel ? 'white' : '#8B3A5A' }} strokeWidth={2} />
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{opt.label}</span>
                  {opt.tag && (
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${opt.tagColor}`}>
                      {opt.tag}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-sm font-bold text-foreground">{opt.price}</p>
                {opt.priceNote && (
                  <p className="text-xs text-muted-foreground line-through">{opt.priceNote}</p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Star rating social proof */}
      <div className="flex items-center gap-2 py-1">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-current" style={{ color: '#C49A6C' }} />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">Trusted by 150,000+ women</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleAdd}
        disabled={isAddingItem}
        className={`w-full flex items-center justify-center gap-2 py-4 text-sm font-bold uppercase tracking-wide rounded-sm transition-all ${
          justAdded
            ? 'bg-green-700 text-white'
            : 'text-white hover:opacity-90'
        }`}
        style={!justAdded ? { backgroundColor: '#8B3A5A' } : {}}
      >
        {isAddingItem ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : justAdded ? (
          <>
            <Check className="h-4 w-4" />
            Added to Bag
          </>
        ) : (
          'Add to Bag'
        )}
      </button>
    </div>
  )
}
