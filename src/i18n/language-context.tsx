import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'
import { translations, type Language, type Translation } from '@/i18n/translations'

const STORAGE_KEY = 'eastgold-lang'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  toggle: () => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getInitialLang(): Language {
  if (typeof window === 'undefined') return 'en'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'ta' ? 'ta' : 'en'
}

export function LanguageProvider({ children }: PropsWithChildren) {
  const [lang, setLangState] = useState<Language>(getInitialLang)

  useLayoutEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
    // Drive Tamil typography off a class we control. Browser translation tools
    // (e.g. Google Translate) overwrite the `lang` attribute after load, which
    // would otherwise disable the Tamil size rules; a class survives that.
    document.documentElement.classList.toggle('lang-ta', lang === 'ta')
  }, [lang])

  const setLang = useCallback((next: Language) => setLangState(next), [])
  const toggle = useCallback(() => setLangState((l) => (l === 'en' ? 'ta' : 'en')), [])

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, setLang, toggle, t: translations[lang] }),
    [lang, setLang, toggle],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
