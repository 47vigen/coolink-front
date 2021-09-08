const RTL_LANGS = ['fa']

export default function isRtl(locale) {
  return RTL_LANGS.includes(locale)
}
