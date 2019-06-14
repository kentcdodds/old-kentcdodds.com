const supportedLanguages = {
  en: 'English',
  ru: 'Русский',
  tr: 'Türkçe',
  es: 'Español',
  ko: '한국어',
  sv: 'Svenska',
  it: 'Italiano',
  id: 'Bahasa Indonesia',
  'pt-br': 'Português do Brasil',
  pl: 'Polski',
  'zh-hant': '繁體中文',
  'zh-hans': '简体中文',
  ja: '日本語',
  fr: 'Français',
  hu: 'Magyar',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  my: 'မြန်မာဘာသာ',
  sk: 'Slovenčina',
  te: 'తెలుగు',
  uk: 'Українська',
  bg: 'Български',
  cs: 'Čeština',
  de: 'Deutsch',
  nl: 'Nederlands',
  nb: 'Norsk',
  fa: 'فارسی',
  ar: 'العربية',
  sr: 'srpski',
}

// borrowed from Dan:
// https://github.com/gaearon/overreacted.io/blob/94cb9455c5f6bc5c3e86c5cb090244a58642e7d8/src/utils/i18n.js
export const codeToLanguage = code =>
  supportedLanguages[code].replace(/ /g, ' ' /* nbsp */)

export const loadFontsForCode = code => {
  switch (code) {
    case 'ru':
    case 'bg':
      import('../fonts/i18n/fonts-shared.cyrillic.css')
      import('../fonts/i18n/fonts-post.cyrillic.css')
      break
    case 'uk':
      import('../fonts/i18n/fonts-shared.cyrillic.css')
      import('../fonts/i18n/fonts-post.cyrillic.css')
      import('../fonts/i18n/fonts-shared.latin-ext.css')
      import('../fonts/i18n/fonts-post.latin-ext.css')
      break
    case 'cs':
    case 'da':
    case 'de':
    case 'es':
    case 'fi':
    case 'fr':
    case 'hu':
    case 'it':
    case 'nl':
    case 'no':
    case 'pl':
    case 'pt-br':
    case 'sk':
    case 'sr':
    case 'sq':
    case 'sv':
    case 'tr':
      import('../fonts/i18n/fonts-shared.latin-ext.css')
      import('../fonts/i18n/fonts-post.latin-ext.css')
      break
    case 'vi':
      import('../fonts/i18n/fonts-shared.vietnamese.css')
      import('../fonts/i18n/fonts-post.vietnamese.css')
      break
    case 'fa':
      import('../fonts/i18n/fonts-post.persian.css')
      break
    case 'ar':
      import('../fonts/i18n/fonts-post.arabic.css')
      break
    default:
      break
  }
}

// TODO: the curried signature is weird.
export const createLanguageLink = (slug, lang) => {
  const rawSlug = slug.replace(`${lang}/`, '')

  return targetLang =>
    targetLang === 'en' ? rawSlug : `${targetLang}${rawSlug}`
}

/* eslint complexity:0 */
