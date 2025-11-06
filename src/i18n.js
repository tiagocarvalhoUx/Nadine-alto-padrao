import { createI18n } from 'vue-i18n'
import pt from './locales/pt.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import de from './locales/de.json'
import it from './locales/it.json'
import zh from './locales/zh.json'

const messages = {
  pt,
  en,
  es,
  fr,
  de,
  it,
  zh
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt', // idioma padrão
  fallbackLocale: 'en',
  messages
})

export default i18n
