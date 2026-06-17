import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'sheen relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-wide transition-[transform,box-shadow,background-color,border-color,color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-gold-gradient text-ink shadow-[0_12px_30px_-12px_rgba(212,175,55,0.75)] hover:-translate-y-0.5 hover:shadow-[0_18px_46px_-12px_rgba(212,175,55,0.95)]',
        outline:
          'border border-gold/50 bg-white/50 text-ink backdrop-blur hover:-translate-y-0.5 hover:border-gold hover:bg-white hover:shadow-[0_12px_30px_-14px_rgba(17,17,17,0.25)]',
        dark: 'bg-ink text-cream shadow-[0_12px_30px_-14px_rgba(17,17,17,0.6)] hover:-translate-y-0.5 hover:bg-ink/90 hover:shadow-[0_18px_44px_-14px_rgba(17,17,17,0.7)]',
        ghost: 'text-ink hover:text-gold-dark',
      },
      size: {
        sm: 'h-10 px-5 text-sm',
        md: 'h-12 px-7 text-sm',
        lg: 'h-14 px-8 text-base',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)
