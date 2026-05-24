import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import zhTW from './locales/zh-TW'
import en from './locales/en'
import ja from './locales/ja'
import ko from './locales/ko'

export type Locale = 'zh-CN' | 'zh-TW' | 'en' | 'ja' | 'ko'

const LOCALE_KEY = 'hrp_locale'

function detectLocale(): Locale {
  const saved = localStorage.getItem(LOCALE_KEY) as Locale | null
  if (saved && ['zh-CN', 'zh-TW', 'en', 'ja', 'ko'].includes(saved)) return saved
  const lang = navigator.language
  if (lang.startsWith('zh-TW') || lang.startsWith('zh-HK')) return 'zh-TW'
  if (lang.startsWith('zh')) return 'zh-CN'
  if (lang.startsWith('ja')) return 'ja'
  if (lang.startsWith('ko')) return 'ko'
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: {
    'zh-CN': zhCN,
    'zh-TW': zhTW,
    en,
    ja,
    ko,
  },
})

export function setLocale(code: Locale) {
  i18n.global.locale.value = code
  localStorage.setItem(LOCALE_KEY, code)
  document.documentElement.lang = code
}
