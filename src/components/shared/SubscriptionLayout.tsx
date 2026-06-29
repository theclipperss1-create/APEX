'use client'

import { useState } from 'react'
import { Check, Sparkles, Shield, Zap, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Company {
  id: string
  slug: string
  name: string
  tier: string
}

interface SubscriptionLayoutProps {
  company: Company
}

export default function SubscriptionLayout({ company }: SubscriptionLayoutProps) {
  const [isYearly, setIsYearly] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: string; value: string } | null>(null)

  const plans = [
    {
      name: 'Free Tier',
      description: 'For small teams initiating digital operations.',
      price: 'Rp 0',
      crossedOutPrice: 'Rp 99,000',
      period: 'Forever',
      value: 'free',
      icon: <Shield className="w-5 h-5 text-gray-400" />,
      features: [
        'Up to 15 Workspace Members',
        '90-Day Attendance Log Retention',
        'Access to Attendance & Task Board',
        'Daily Automated Backups'
      ],
      cta: 'Activate Now',
      style: 'border-border bg-white text-gray-900'
    },
    {
      name: 'Pro Tier',
      description: 'Complete solution for field and office team efficiency.',
      price: isYearly ? 'Rp 1,990,000' : 'Rp 249,000',
      crossedOutPrice: isYearly ? 'Rp 2,988,000' : 'Rp 349,000',
      period: isYearly ? 'Year' : 'Month',
      value: 'pro',
      icon: <Sparkles className="w-5 h-5 text-primary" />,
      features: [
        'Up to 100 Workspace Members',
        '1-Year Attendance Log Retention',
        'Full Access to All Features',
        'Priority WhatsApp Support',
        'Overtime & Bonus Calculator'
      ],
      cta: 'Upgrade to Pro',
      recommended: true,
      style: 'border-primary bg-white text-gray-900 shadow-lg shadow-primary/5 ring-1 ring-primary/20'
    },
    {
      name: 'Enterprise Tier',
      description: 'Enterprise-grade security, unlimited scalability & performance.',
      price: isYearly ? 'Rp 11,990,000' : 'Rp 1,499,000',
      crossedOutPrice: isYearly ? 'Rp 17,988,000' : 'Rp 1,999,000',
      period: isYearly ? 'Year' : 'Month',
      value: 'enterprise',
      icon: <Zap className="w-5 h-5 text-amber-400 animate-pulse" />,
      features: [
        'Unlimited Workspace Members',
        'Infinite Attendance Log Retention',
        'All Features & Custom API Access',
        '24/7 Support & Dedicated Account Manager',
        'Isolated Tenant Sub-Node'
      ],
      cta: 'Go Enterprise',
      dark: true,
      style: 'border-slate-800 bg-slate-950 text-white shadow-xl shadow-slate-950/20'
    }
  ]

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (plan.value === company.tier) return
    setSelectedPlan({ name: plan.name, price: plan.price, value: plan.value })
  }

  // Securely build the WhatsApp URL for confirmation
  const waNumber = '6282124153732'
  const waText = selectedPlan 
    ? encodeURIComponent(`Hello Admin, I would like to confirm my subscription payment for the plan ${selectedPlan.name} (${selectedPlan.price}/${isYearly ? 'Year' : 'Month'}) for company ${company.name} (ID: ${company.id}).`)
    : ''
  const qrisUrl = `https://wa.me/${waNumber}?text=${waText}`

  return (
    <div className="space-y-8">
      {/* Google AI Pro / Gemini-style Selector Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
          Choose the level of control that fits your operations.
        </h2>
        <p className="text-sm text-gray-500 max-w-[55ch] mx-auto leading-relaxed">
          All plans include bank-grade encryption, offline-first access, and daily backups.
        </p>

        {/* Monthly / Yearly Switch */}
        <div className="inline-flex items-center gap-3 p-1 bg-gray-100 border border-border rounded-full mt-4">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all cursor-pointer ${
              !isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold font-sans transition-all cursor-pointer flex items-center gap-1.5 ${
              isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            Yearly
            <span className="bg-primary/10 text-primary text-[8px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-bounce">
              Save 33%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-4">
        {plans.map((plan) => {
          const isActive = company.tier === plan.value
          const isSelected = selectedPlan?.value === plan.value

          return (
            <motion.div
              key={plan.value}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className={`relative flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 min-h-[480px] ${plan.style} ${
                isSelected ? 'ring-4 ring-primary/20 border-primary' : ''
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-[9px] font-extrabold text-white bg-primary rounded-full uppercase tracking-widest shadow-sm">
                  Most Popular
                </span>
              )}

              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className={`text-base font-extrabold tracking-wide uppercase ${plan.dark ? 'text-amber-400' : 'text-gray-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-[11px] mt-1.5 leading-relaxed ${plan.dark ? 'text-slate-400' : 'text-gray-500'}`}>
                      {plan.description}
                    </p>
                  </div>
                  <div className={`p-2 rounded-lg ${plan.dark ? 'bg-slate-900 border border-slate-800' : 'bg-gray-50 border border-border'}`}>
                    {plan.icon}
                  </div>
                </div>

                <div className="border-b border-border/10 pb-6 space-y-1">
                  <div className="flex items-baseline gap-1.5 flex-wrap h-5">
                    {plan.crossedOutPrice && (
                      <span className="text-xs line-through text-red-500/80 font-bold font-mono">
                        {plan.crossedOutPrice}
                      </span>
                    )}
                    {plan.value !== 'free' && isYearly && (
                      <span className="bg-green-100 text-green-700 text-[8px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider animate-pulse">
                        Best Value (Save 33%)
                      </span>
                    )}
                    {plan.value === 'free' && (
                      <span className="bg-orange-100 text-primary text-[8px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider">
                        100% Free Gift
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={plan.price}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className={`text-3xl font-extrabold tracking-tight ${plan.dark ? 'text-white' : 'text-gray-900'}`}
                      >
                        {plan.price}
                      </motion.span>
                    </AnimatePresence>
                    <span className={`text-[10px] font-mono uppercase ${plan.dark ? 'text-slate-500' : 'text-gray-400'}`}>
                      / {plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3.5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs leading-normal">
                      <Check className={`w-4 h-4 mt-0.5 shrink-0 ${plan.dark ? 'text-amber-400' : 'text-primary'}`} />
                      <span className={plan.dark ? 'text-slate-300' : 'text-gray-600'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-border/5">
                {isActive ? (
                  <button
                    disabled
                    className="w-full text-center py-3 bg-green-50 border border-green-200 text-green-600 font-mono text-xs uppercase rounded-[4px] font-bold tracking-wider"
                  >
                    Active Now
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full text-center py-3 font-mono text-xs font-bold uppercase rounded-[4px] transition-all cursor-pointer ${
                      plan.dark
                        ? 'bg-white hover:bg-gray-100 text-slate-950 hover:shadow-lg shadow-white/5 active:scale-[0.98]'
                        : isSelected
                        ? 'bg-primary text-white shadow-md shadow-primary/10 active:scale-[0.98]'
                        : 'bg-white hover:bg-gray-50 text-gray-700 border border-border hover:border-gray-400 active:scale-[0.98]'
                    }`}
                  >
                    {plan.cta}
                  </button>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Google-style Payment QRIS Modal Overlay */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setSelectedPlan(null)}
          />

          {/* Modal Container */}
          <div className="bg-white border border-border rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-200 space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-border rounded-full hover:bg-gray-50 transition-colors active:scale-90 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>

            {/* Header */}
            <div className="border-b border-border pb-4 pr-6">
              <span className="text-[9px] font-mono font-bold text-primary uppercase bg-orange-50 border border-primary/20 px-2 py-0.5 rounded-[2px] tracking-wide">
                Invoice & Activation
              </span>
              <h3 className="text-lg font-extrabold text-gray-900 mt-2 font-sans">
                Activate {selectedPlan.name}
              </h3>
              <p className="text-xs text-gray-500 font-mono mt-1 uppercase">
                BILLING ID: {company.slug.toUpperCase()}_{new Date().getTime().toString().slice(-6)}
              </p>
            </div>

            {/* QRIS Code */}
            <div className="flex flex-col items-center gap-4 bg-gray-50 p-6 rounded-xl border border-border">
              <svg viewBox="0 0 100 100" className="w-44 h-44 shadow-sm bg-white p-2 rounded-lg">
                <rect width="100" height="100" fill="white" />
                <rect x="5" y="5" width="25" height="25" fill="#0C111D" />
                <rect x="10" y="10" width="15" height="15" fill="white" />
                <rect x="12" y="12" width="11" height="11" fill="#0C111D" />

                <rect x="70" y="5" width="25" height="25" fill="#0C111D" />
                <rect x="75" y="10" width="15" height="15" fill="white" />
                <rect x="77" y="12" width="11" height="11" fill="#0C111D" />

                <rect x="5" y="70" width="25" height="25" fill="#0C111D" />
                <rect x="10" y="75" width="15" height="15" fill="white" />
                <rect x="12" y="77" width="11" height="11" fill="#0C111D" />

                {/* Center QRIS logo */}
                <rect x="42" y="42" width="16" height="16" fill="#0C111D" />
                <rect x="44" y="44" width="12" height="12" fill="white" />
                <text x="50" y="52" fontSize="6" fontWeight="bold" textAnchor="middle" fill="#0C111D" fontFamily="monospace">QRIS</text>

                {/* Random noise squares */}
                <rect x="40" y="10" width="10" height="5" fill="#0C111D" />
                <rect x="55" y="15" width="5" height="15" fill="#0C111D" />
                <rect x="15" y="40" width="5" height="15" fill="#0C111D" />
                <rect x="40" y="70" width="15" height="5" fill="#0C111D" />
                <rect x="70" y="40" width="5" height="10" fill="#0C111D" />
                <rect x="80" y="55" width="10" height="5" fill="#0C111D" />
                <rect x="45" y="80" width="5" height="10" fill="#0C111D" />
                <rect x="80" y="80" width="10" height="10" fill="#0C111D" />
              </svg>
              <div className="text-center">
                <span className="text-[10px] font-mono font-bold text-gray-500 uppercase tracking-widest block">
                  APEX PAY_GATEWAY
                </span>
                <span className="text-[11px] text-gray-900 font-extrabold mt-1 block">
                  TOTAL AMOUNT: {selectedPlan.price}
                </span>
              </div>
            </div>

            {/* Instruction Steps */}
            <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed">
              <div className="flex gap-3">
                <span className="w-5 h-5 shrink-0 bg-primary/10 text-primary font-extrabold text-[10px] flex items-center justify-center rounded-full">1</span>
                <span>Scan the QRIS code above using your banking app or e-wallet.</span>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 shrink-0 bg-primary/10 text-primary font-extrabold text-[10px] flex items-center justify-center rounded-full">2</span>
                <span>Complete the payment matching your chosen plan price.</span>
              </div>
              <div className="flex gap-3">
                <span className="w-5 h-5 shrink-0 bg-primary/10 text-primary font-extrabold text-[10px] flex items-center justify-center rounded-full">3</span>
                <span>Send the payment screenshot and confirmation to WhatsApp Admin below.</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={qrisUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-block text-center py-3.5 bg-green-600 hover:bg-green-500 text-white font-mono text-xs font-bold uppercase rounded-[4px] transition-colors cursor-pointer shadow-md shadow-green-100 active:scale-[0.98]"
              >
                Confirm Payment via WhatsApp
              </a>
              <button
                onClick={() => setSelectedPlan(null)}
                className="w-full text-center py-3 bg-white hover:bg-gray-50 text-gray-500 font-mono text-xs uppercase rounded-[4px] border border-border hover:border-gray-400 transition-colors cursor-pointer active:scale-[0.98]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
