import {
  forwardRef,
  useState,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Building2, CheckCircle2, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-variants'
import { CONTACT } from '@/data/site'
import { easeLux, fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations'
import { useLanguage } from '@/i18n/language-context'
import { translations } from '@/i18n/translations'
import { createEnquiry } from '@/lib/api/enquiries'

const schema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit mobile number'),
  area: z.string().optional(),
  service: z.string().optional(),
  typeOfGold: z.string().optional(),
  callTime: z.string().optional(),
  message: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export function Consultation() {
  const { t } = useLanguage()
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    // Store the canonical English service label so the admin dashboard always
    // reads consistently, regardless of the language the visitor used.
    const serviceIndex = t.consultation.serviceOptions.indexOf(values.service ?? '')
    const service =
      serviceIndex >= 0 ? translations.en.consultation.serviceOptions[serviceIndex] : values.service

    // Persist the enquiry to the backend (MongoDB). The submission UX is kept
    // identical even if the API is unreachable, so the public site never breaks.
    try {
      await createEnquiry({
        name: values.name,
        phone: values.mobile,
        message: values.message,
        area: values.area,
        service,
        typeOfGold: values.typeOfGold,
        callTime: values.callTime,
      })
    } catch (err) {
      console.error('Failed to store enquiry:', err)
    }
    setSubmitted(true)
    reset()
  }

  const whatsappHref = `https://wa.me/${CONTACT.whatsappRaw}?text=${encodeURIComponent(
    'Hi EastGold, I would like a free gold valuation.',
  )}`

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid items-stretch gap-8 lg:grid-cols-2"
        >
          {/* Left — invitation + branch info */}
          <motion.div
            variants={fadeInUp}
            className="bg-ink flex flex-col justify-between rounded-3xl p-8 text-white sm:p-10"
          >
            <div>
              <span className="eyebrow-label text-gold inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] uppercase">
                <span className="bg-gold h-px w-8" />
                {t.consultation.eyebrow}
              </span>
              <h2 className="mt-5 font-serif text-4xl leading-tight font-medium sm:text-5xl">
                {t.consultation.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/60">
                {t.consultation.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    buttonVariants({ size: 'md' }),
                    'bg-emerald-500 text-white hover:bg-emerald-600',
                  )}
                >
                  <MessageCircle className="h-5 w-5" /> {t.consultation.whatsapp}
                </a>
                <a
                  href={`tel:${CONTACT.phoneRaw}`}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'md' }),
                    'border-white/30 bg-white/5 whitespace-nowrap text-white hover:bg-white/10',
                  )}
                >
                  <Phone className="h-5 w-5 shrink-0" /> {CONTACT.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="mt-10 space-y-4 border-t border-white/10 pt-8 text-sm text-white/70">
              <p className="text-gold flex items-center gap-3 font-serif text-xl font-semibold">
                <Building2 className="h-5 w-5" /> {t.consultation.branch}
              </p>
              <p className="flex items-start gap-3">
                <MapPin className="text-gold mt-0.5 h-4 w-4 shrink-0" /> {CONTACT.address}
              </p>
              <p className="flex items-center gap-3">
                <Clock className="text-gold h-4 w-4 shrink-0" /> {t.consultation.hours}
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            variants={fadeInUp}
            className="border-gold/25 shadow-luxury rounded-3xl border bg-white p-8 sm:p-10"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeLux }}
                className="flex h-full flex-col items-center justify-center text-center"
              >
                <CheckCircle2 className="h-16 w-16 text-emerald-500" />
                <h3 className="text-ink mt-6 font-serif text-3xl font-semibold">
                  {t.consultation.successTitle}
                </h3>
                <p className="text-ash mt-3 max-w-sm text-sm">{t.consultation.successBody}</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mt-6')}
                >
                  {t.consultation.submitAnother}
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <FloatingField
                  label={t.consultation.nameLabel}
                  error={errors.name?.message}
                  {...register('name')}
                />

                <FloatingField
                  label={t.consultation.mobileLabel}
                  inputMode="numeric"
                  error={errors.mobile?.message}
                  {...register('mobile')}
                />

                <FloatingField
                  label={t.consultation.areaLabel}
                  error={errors.area?.message}
                  {...register('area')}
                />

                <FloatingSelect
                  label={t.consultation.serviceLabel}
                  options={t.consultation.serviceOptions}
                  error={errors.service?.message}
                  {...register('service')}
                />

                <FloatingField
                  label={t.consultation.typeLabel}
                  error={errors.typeOfGold?.message}
                  {...register('typeOfGold')}
                />

                <FloatingField
                  label={t.consultation.callTimeLabel}
                  error={errors.callTime?.message}
                  {...register('callTime')}
                />

                <FloatingTextarea
                  label={t.consultation.messageLabel}
                  error={errors.message?.message}
                  {...register('message')}
                />

                <Button type="submit" loading={isSubmitting} size="lg" className="mt-2 w-full">
                  {isSubmitting ? t.consultation.submitting : t.consultation.submit}
                </Button>

                <p className="text-ash text-center text-xs">{t.consultation.privacy}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

interface FloatingFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

/**
 * Input with a floating label, animated focus ring and inline validation.
 * The label rests inside the field and lifts up on focus or when filled
 * (`:placeholder-shown` peer trick — a single space placeholder is required).
 */
const FloatingField = forwardRef<HTMLInputElement, FloatingFieldProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
      <div className="flex flex-col gap-1.5">
        <div className="group relative">
          <input
            id={inputId}
            ref={ref}
            placeholder=" "
            aria-invalid={Boolean(error)}
            className={cn(
              'peer w-full rounded-xl border bg-cream/50 px-4 pt-6 pb-2 text-sm text-ink transition-all duration-300 focus:bg-white focus:outline-none focus:ring-4',
              error
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/15'
                : 'border-black/10 focus:border-gold focus:ring-gold/15',
              className,
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              'pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-all duration-200',
              'peer-focus:top-3 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-medium',
              'peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium',
              error ? 'text-rose-400 peer-focus:text-rose-500' : 'text-ash peer-focus:text-gold-dark',
            )}
          >
            {label}
          </label>
        </div>
        <AnimatePresence initial={false}>
          {error && (
            <motion.span
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1.5 px-1 text-xs text-rose-500"
            >
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {error}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    )
  },
)
FloatingField.displayName = 'FloatingField'

interface FloatingTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

/** Multi-line variant of FloatingField — same floating-label behaviour. */
const FloatingTextarea = forwardRef<HTMLTextAreaElement, FloatingTextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
      <div className="flex flex-col gap-1.5">
        <div className="group relative">
          <textarea
            id={inputId}
            ref={ref}
            rows={3}
            placeholder=" "
            aria-invalid={Boolean(error)}
            className={cn(
              'peer w-full resize-none rounded-xl border bg-cream/50 px-4 pt-6 pb-2 text-sm text-ink transition-all duration-300 focus:bg-white focus:outline-none focus:ring-4',
              error
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/15'
                : 'border-black/10 focus:border-gold focus:ring-gold/15',
              className,
            )}
            {...props}
          />
          <label
            htmlFor={inputId}
            className={cn(
              'pointer-events-none absolute left-4 top-5 text-sm transition-all duration-200',
              'peer-focus:top-3 peer-focus:text-xs peer-focus:font-medium',
              'peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium',
              error ? 'text-rose-400 peer-focus:text-rose-500' : 'text-ash peer-focus:text-gold-dark',
            )}
          >
            {label}
          </label>
        </div>
      </div>
    )
  },
)
FloatingTextarea.displayName = 'FloatingTextarea'

interface FloatingSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: string[]
  error?: string
}

/** Select styled to match FloatingField, with a persistent top label. */
const FloatingSelect = forwardRef<HTMLSelectElement, FloatingSelectProps>(
  ({ label, options, error, className, id, ...props }, ref) => {
    const inputId = id ?? `field-${label.replace(/\s+/g, '-').toLowerCase()}`
    return (
      <div className="flex flex-col gap-1.5">
        <div className="group relative">
          <select
            id={inputId}
            ref={ref}
            defaultValue=""
            aria-invalid={Boolean(error)}
            className={cn(
              'peer w-full appearance-none rounded-xl border bg-cream/50 px-4 pt-6 pb-2 text-sm text-ink transition-all duration-300 focus:bg-white focus:outline-none focus:ring-4',
              error
                ? 'border-rose-300 focus:border-rose-400 focus:ring-rose-500/15'
                : 'border-black/10 focus:border-gold focus:ring-gold/15',
              className,
            )}
            {...props}
          >
            <option value="" />
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <label
            htmlFor={inputId}
            className={cn(
              'pointer-events-none absolute left-4 top-3 text-xs font-medium transition-all duration-200',
              error ? 'text-rose-400' : 'text-ash',
            )}
          >
            {label}
          </label>
          <svg
            aria-hidden
            className="text-ash pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    )
  },
)
FloatingSelect.displayName = 'FloatingSelect'
