'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Star,
  Zap,
  Droplets,
  Activity,
  CheckCircle2,
} from 'lucide-react'
import CollectionSection from '@/components/marketing/collection-section'
import { useCollections } from '@/hooks/use-collections'
import { trackMetaEvent } from '@/lib/meta-pixel'

const HERO_IMAGE = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80'
const LIFESTYLE_IMAGE = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=1200&q=80'

const benefits = [
  {
    icon: Activity,
    title: 'Boosts Circulation',
    desc: 'Stimulates blood flow to break down fat deposits and reduce the appearance of cellulite.',
  },
  {
    icon: Droplets,
    title: 'Drains Lymph Fluid',
    desc: 'Gentle rhythmic massage encourages lymphatic drainage for less puffiness and bloating.',
  },
  {
    icon: Zap,
    title: 'Firms & Tones Skin',
    desc: 'Increases collagen production for visibly firmer, smoother skin in just weeks of use.',
  },
]

const stats = [
  { value: '93%', label: 'Reported visible improvement in 4 weeks' },
  { value: '5-min', label: 'Daily routine for professional results' },
  { value: '150K+', label: 'Happy customers worldwide' },
]

export default function HomePage() {
  const { data: collections, isLoading } = useCollections()
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    trackMetaEvent('Lead', {
      content_name: 'newsletter_signup',
      status: 'submitted',
    })
    setNewsletterSubmitted(true)
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'var(--brand-light)' }}>
        <div className="container-custom grid lg:grid-cols-2 gap-8 items-center py-16 lg:py-28">
          {/* Text Content */}
          <div className="space-y-7 animate-fade-in-up order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white" style={{ backgroundColor: 'var(--brand-secondary)' }}>
              Clinically Inspired Technology
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-heading font-bold leading-[1.1] tracking-tight text-balance" style={{ color: 'var(--brand-primary)' }}>
              Smoother Skin.<br />
              <span className="italic font-normal" style={{ color: 'var(--brand-secondary)' }}>Starting Today.</span>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed">
              The SculptGlow Massager combines deep-tissue stimulation and lymphatic drainage to visibly reduce cellulite — in the comfort of your home.
            </p>

            {/* Social proof stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" style={{ color: 'var(--brand-gold)' }} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground font-medium">4.9 / 5 from 2,400+ verified buyers</span>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/products"
                className="btn-brand-primary inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wide rounded-sm transition-opacity"
                prefetch={true}
              >
                Shop the Massager
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/about"
                className="btn-brand-outline inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold uppercase tracking-wide rounded-sm transition-colors"
                prefetch={true}
              >
                How It Works
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative order-1 lg:order-2 animate-fade-in">
            <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={HERO_IMAGE}
                alt="Woman using SculptGlow cellulite massager on legs"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-block h-2 w-2 rounded-full animate-pulse-dot" style={{ backgroundColor: 'var(--brand-secondary)' }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--brand-primary)' }}>Low Stock Alert</span>
                </div>
                <p className="text-xs text-muted-foreground">Only 47 units left this week</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y py-8" style={{ background: 'var(--brand-primary)' }}>
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/20">
            {stats.map((s) => (
              <div key={s.value} className="text-center py-2 sm:py-0">
                <p className="text-3xl font-heading font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/70 mt-1 max-w-[180px] mx-auto">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container-custom">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: 'var(--brand-secondary)' }}>
              Why SculptGlow Works
            </p>
            <h2 className="text-h2 font-heading font-bold" style={{ color: 'var(--brand-primary)' }}>
              Three Actions, One Tool
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl p-8 text-center space-y-4 border border-border/60 hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full mx-auto" style={{ backgroundColor: 'var(--brand-light)' }}>
                  <b.icon className="h-6 w-6" style={{ color: 'var(--brand-primary)' }} strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-heading font-semibold" style={{ color: 'var(--brand-primary)' }}>{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      {isLoading ? (
        <section className="py-section">
          <div className="container-custom">
            <div className="animate-pulse space-y-4 text-center">
              <div className="h-3 w-20 bg-muted rounded mx-auto" />
              <div className="h-8 w-64 bg-muted rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[3/4] bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      ) : collections && collections.length > 0 ? (
        <>
          {collections.map((collection: { id: string; handle: string; title: string; metadata?: Record<string, unknown> }, index: number) => (
            <CollectionSection
              key={collection.id}
              collection={collection}
              alternate={index % 2 === 1}
            />
          ))}
        </>
      ) : null}

      {/* Before / After / How-to section */}
      <section className="py-20" style={{ background: 'var(--brand-light)' }}>
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative shadow-xl">
              <Image
                src={LIFESTYLE_IMAGE}
                alt="SculptGlow lifestyle — smooth skin result"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-6 lg:max-w-md">
              <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: 'var(--brand-secondary)' }}>The SculptGlow Ritual</p>
              <h2 className="text-h2 font-heading font-bold text-balance" style={{ color: 'var(--brand-primary)' }}>
                5 Minutes a Day.<br />Real, Lasting Results.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Inspired by professional lymphatic drainage massage, SculptGlow is engineered to deliver targeted vibration and pressure exactly where you need it — thighs, abdomen, arms, and more.
              </p>
              <ul className="space-y-3">
                {[
                  'Apply your body oil or lotion',
                  'Use circular motions for 3–5 min per area',
                  'Visible results from Week 2 onward',
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" style={{ color: 'var(--brand-secondary)' }} strokeWidth={2} />
                    <span className="text-sm text-foreground">{step}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/products"
                className="btn-brand-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold uppercase tracking-wide rounded-sm transition-opacity"
                prefetch={true}
              >
                Get Yours Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Features Bar */}
      <section className="py-10 border-y bg-background">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            <div className="flex items-center gap-4 justify-center text-center md:text-left md:justify-start">
              <Truck className="h-6 w-6 flex-shrink-0" strokeWidth={1.5} style={{ color: 'var(--brand-primary)' }} />
              <div>
                <p className="text-sm font-semibold">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $60</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center">
              <RotateCcw className="h-6 w-6 flex-shrink-0" strokeWidth={1.5} style={{ color: 'var(--brand-primary)' }} />
              <div>
                <p className="text-sm font-semibold">30-Day Guarantee</p>
                <p className="text-xs text-muted-foreground">Love it or full refund</p>
              </div>
            </div>
            <div className="flex items-center gap-4 justify-center md:justify-end text-center md:text-right">
              <Shield className="h-6 w-6 flex-shrink-0" strokeWidth={1.5} style={{ color: 'var(--brand-primary)' }} />
              <div>
                <p className="text-sm font-semibold">Secure Checkout</p>
                <p className="text-xs text-muted-foreground">256-bit SSL encryption</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20" style={{ background: 'var(--brand-primary)' }}>
        <div className="container-custom max-w-xl text-center">
          <h2 className="text-h2 font-heading font-bold text-white">Get 10% Off Your First Order</h2>
          <p className="mt-3 text-white/70 text-sm">
            Join 150,000+ women who already sculpt smarter. Exclusive tips, early drops, and members-only deals.
          </p>
          {newsletterSubmitted ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-white font-medium">
              <CheckCircle2 className="h-5 w-5" />
              <span>You&apos;re in! Check your inbox for your discount code.</span>
            </div>
          ) : (
            <form className="mt-8 flex gap-2" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-sm bg-white/10 border border-white/30 px-4 py-3 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide hover:opacity-90 transition-opacity whitespace-nowrap rounded-sm"
                style={{ color: 'var(--brand-primary)' }}
              >
                Claim 10% Off
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
