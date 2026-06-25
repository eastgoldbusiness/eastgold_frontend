import {
  BadgeCheck,
  Banknote,
  Building2,
  Coins,
  HandCoins,
  Landmark,
  Lock,
  Scale,
  ScanLine,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react'

export const CONTACT = {
  brand: 'EastGold',
  tagline: 'Premium Gold Exchange',
  phoneDisplay: '+91 63748 71020',
  phoneRaw: '+916374871020',
  whatsappRaw: '916374871020',
  email: 'seturajan31@gmail.com',
  branch: 'Coimbatore Main Branch',
  address: 'F2, 1st Floor, Om Muruga Plaza, Ponniya Street, SBI Bank Near, Cross Cut Road, Coimbatore – 641008',
  hours: 'Mon – Sat · 10:00 AM – 8:00 PM',
} as const

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
] as const

export interface HeroIndicator {
  icon: LucideIcon
  label: string
}

export const HERO_INDICATORS: HeroIndicator[] = [
  { icon: Users, label: '10,000+ Happy Customers' },
  { icon: BadgeCheck, label: 'BIS Certified Process' },
  { icon: Banknote, label: 'Instant Bank Transfer' },
  { icon: ScanLine, label: 'XRF Purity Testing' },
]



export interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

export const FEATURES: Feature[] = [
  {
    icon: Scale,
    title: 'Transparent Valuation',
    description:
      'Every gram weighed and priced openly in front of you — no hidden deductions, ever.',
  },
  {
    icon: Banknote,
    title: 'Instant Payment',
    description:
      'Receive the full agreed value through immediate bank transfer or cash on the spot.',
  },
  {
    icon: ScanLine,
    title: 'XRF Purity Testing',
    description:
      'German XRF spectrometers verify exact purity without melting or damaging your gold.',
  },
  {
    icon: Lock,
    title: 'Secure Process',
    description:
      'CCTV-monitored private valuation rooms and fully documented, auditable transactions.',
  },
  {
    icon: TrendingUp,
    title: 'Market Best Price',
    description:
      'Rates benchmarked live to the bullion market so you always get the highest fair value.',
  },
  {
    icon: ShieldCheck,
    title: 'Trusted Experts',
    description:
      'Two decades of certified valuers serving Coimbatore families with quiet integrity.',
  },
]

export interface ProcessStep {
  icon: LucideIcon
  step: string
  title: string
  description: string
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    icon: Coins,
    step: '01',
    title: 'Bring Your Gold',
    description: 'Walk in with your jewellery, coins or bars. No appointment necessary.',
  },
  {
    icon: ScanLine,
    step: '02',
    title: 'Purity Testing',
    description: 'XRF analysis determines exact karat and weight while you watch.',
  },
  {
    icon: Scale,
    step: '03',
    title: 'Market Valuation',
    description: 'We calculate value against the live bullion rate, transparently.',
  },
  {
    icon: Banknote,
    step: '04',
    title: 'Instant Payment',
    description: 'Accept the offer and receive instant bank transfer or cash.',
  },
]

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  image: string
}

export const SERVICES: Service[] = [
  {
    icon: HandCoins,
    title: 'Sell Old Gold',
    description: 'Turn unused jewellery into instant cash at the best market value.',
    image: '/images/services/sell-old-gold.png',
  },
  {
    icon: Sparkles,
    title: 'Gold Exchange',
    description: 'Exchange old gold for fresh value with complete transparency.',
    image: '/images/services/gold-exchange.png',
  },
  {
    icon: Scale,
    title: 'Gold Valuation',
    description: 'Certified XRF assessment of purity and weight in minutes.',
    image: '/images/services/gold-valuation.png',
  },
  {
    icon: Landmark,
    title: 'Release Pledged Gold',
    description: 'We help release your pledged gold from banks and lenders smoothly.',
    image: '/images/services/release-pledged-gold.png',
  },
  {
    icon: Building2,
    title: 'Gold Loan Settlement',
    description: 'Settle outstanding gold loans quickly with expert assistance.',
    image: '/images/services/gold-loan-settlement.png',
  },
  {
    icon: Wallet,
    title: 'Instant Cash Transfer',
    description: 'Immediate, secure settlement straight to your bank account.',
    image: '/images/services/instant-cash-transfer.png',
  },
]

export interface Stat {
  value: string
  label: string
}

export const STATS: Stat[] = [
  { value: '99.9%', label: 'Valuation Accuracy' },
  { value: '10,000+', label: 'Happy Customers' },
  { value: '100%', label: 'Transparent Process' },
]

export interface SecurityBadge {
  icon: LucideIcon
  label: string
}

export const SECURITY_BADGES: SecurityBadge[] = [
  { icon: BadgeCheck, label: 'BIS Certified' },
  { icon: ScanLine, label: 'XRF Verified' },
  { icon: Banknote, label: 'Instant Transfer' },
  { icon: Lock, label: 'Secure Transactions' },
]

export interface Testimonial {
  name: string
  profession: string
  review: string
  avatar: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Lakshmi Narayanan',
    profession: 'School Teacher, Saibaba Colony',
    review:
      'They tested my gold in front of me and explained every number. I received the full amount in my account within minutes. Truly transparent.',
    avatar: 'https://images.unsplash.com/photo-1629112993078-b16b98b99b07?fit=crop&w=160&h=160&crop=faces',
  },
  {
    name: 'Karthik Raja',
    profession: 'Textile Business Owner, Tiruppur',
    review:
      'I exchanged old jewellery during a cash crunch. The valuation was the best I found in Coimbatore and the process felt completely professional.',
    avatar: 'https://images.unsplash.com/photo-1587837073080-448bc6a2329b?fit=crop&w=160&h=160&crop=faces',
  },
  {
    name: 'Priya Devi',
    profession: 'Software Engineer, Peelamedu',
    review:
      'They helped me release my pledged gold from the bank without any stress. Polite team, private rooms, and no hidden charges at all.',
    avatar: 'https://images.unsplash.com/photo-1701181392121-6982d097ae2b?fit=crop&w=160&h=160&crop=faces',
  },
  {
    name: 'Mohammed Anwar',
    profession: 'Retired Bank Manager, RS Puram',
    review:
      'As a former banker I am hard to impress. EastGold’s documentation and XRF testing are genuinely institutional grade. Highly trustworthy.',
    avatar: 'https://images.unsplash.com/photo-1675956584870-b3331e50904c?fit=crop&w=160&h=160&crop=faces',
  },
]

export interface Faq {
  question: string
  answer: string
}

export const FAQS: Faq[] = [
  {
    question: 'What documents are required to sell old gold?',
    answer:
      'Government-issued identification and basic details may be required. Our team will explain the exact requirements.',
  },
  {
    question: 'How is the gold valued?',
    answer:
      'The gold is checked for weight and purity, and the valuation details are explained clearly.',
  },
  {
    question: 'Is doorstep service available?',
    answer:
      'Doorstep service may be available by appointment in selected areas. Contact our team to confirm availability.',
  },
  {
    question: 'Is support available for releasing pledged gold?',
    answer:
      'Yes. Our team will explain the available support, process and applicable conditions.',
  },
  {
    question: 'Are there any hidden charges?',
    answer:
      'Service details and any applicable charges will be communicated clearly in advance.',
  },
  {
    question: 'Can the exact gold value be confirmed over the phone?',
    answer:
      'An exact value cannot be confirmed without physical verification. Contact us to schedule a valuation.',
  },
]

export const FOOTER_LINKS = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
  ],
  services: [
    { label: 'Sell Old Gold', href: '#services' },
    { label: 'Gold Exchange', href: '#services' },
    { label: 'Gold Valuation', href: '#services' },
    { label: 'Release Pledged Gold', href: '#services' },
    { label: 'Gold Loan Settlement', href: '#services' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'BIS Compliance', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
}
