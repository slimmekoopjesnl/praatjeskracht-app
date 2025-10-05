import React from 'react'
import { useAppStore } from '../store/useAppStore'
import { t } from '../i18n'

/**
 * LanguageSwitcher renders a simple select or buttons allowing the user to
 * choose between Dutch (nl) and English (en). It uses the global
 * language state from the store and updates it when changed.
 */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useAppStore((state) => ({
    language: state.language,
    setLanguage: state.setLanguage
  }))

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const lang = e.target.value as 'nl' | 'en'
    setLanguage(lang)
  }

  return (
    <div className="inline-flex items-center gap-1">
      <label htmlFor="lang" className="text-sm hidden sm:block">{t('settings.language', language)}:</label>
      <select
        id="lang"
        value={language}
        onChange={handleChange}
        className="border rounded p-1 text-sm"
      >
        <option value="nl">{t('language.nl', language)}</option>
        <option value="en">{t('language.en', language)}</option>
      </select>
    </div>
  )
}
