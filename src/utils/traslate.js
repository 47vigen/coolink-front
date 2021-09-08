import en from '../locales/en'
import fa from '../locales/fa'

export default function traslate(locale) {
  switch (locale) {
    case 'en':
      return en

    default:
      return fa
  }
}
