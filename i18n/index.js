// i18n/index.js
const en = require('./en')
const zh = require('./zh')

const langs = { en, zh }
let currentLang = 'en'
let listeners = []

function getLang() {
  return currentLang
}

function setLang(lang) {
  if (!langs[lang]) return false
  currentLang = lang
  try { wx.setStorageSync('lang', lang) } catch (e) {}
  listeners.forEach(fn => {
    try { fn(currentLang) } catch (err) { console.error('i18n listener error', err) }
  })
  return true
}

function t(path) {
  const keys = path.split('.')
  let value = langs[currentLang]
  for (let k of keys) {
    if (value && Object.prototype.hasOwnProperty.call(value, k)) value = value[k]
    else return path
  }
  return value
}

/**
 * Subscribe to language changes.
 * Returns an unsubscribe function.
 */
function onChange(callback) {
  if (typeof callback !== 'function') return () => {}
  listeners.push(callback)
  return () => { listeners = listeners.filter(fn => fn !== callback) }
}

module.exports = { setLang, t, onChange, getLang }
