// i18n.ts
// Simple internationalization helper. Defines a set of translation keys for
// Dutch (nl) and English (en) and exposes a helper function `t` to look
// up the translated string and perform simple placeholder interpolation.

// Translation dictionary. Each key maps to an object with `nl` and `en` values.
const translations: Record<string, { nl: string; en: string }> = {
  'login.title': { nl: 'Inloggen', en: 'Login' },
  'login.email': { nl: 'E-mailadres', en: 'Email address' },
  'login.sendMagicLink': { nl: 'Stuur magic link', en: 'Send magic link' },
  'login.orSignup': { nl: 'of registreer je', en: 'or sign up' },
  'login.signupButton': { nl: 'Registreer', en: 'Sign up' },
  'signup.title': { nl: 'Registreer', en: 'Sign up' },
  'signup.email': { nl: 'E-mailadres', en: 'Email address' },
  'signup.password': { nl: 'Wachtwoord', en: 'Password' },
  'signup.submit': { nl: 'Maak account', en: 'Create account' },
  'signup.loginInstead': { nl: 'Heb je al een account? Inloggen', en: 'Already have an account? Log in' },
  'home.welcome': { nl: 'Welkom!', en: 'Welcome!' },
  'home.loginPrompt': { nl: 'Log in om aan de slag te gaan.', en: 'Log in to get started.' },
  'home.goToLogin': { nl: 'Ga naar inloggen', en: 'Go to login' },
  'home.title': { nl: 'Slaap zacht, praatjeskracht', en: 'Sleep tight, chat power' },
  'home.progress': { nl: '{count} / {total} vragen voltooid', en: '{count} / {total} questions completed' },
  'home.settings': { nl: 'Instellingen', en: 'Settings' },
  'home.admin': { nl: 'Admin', en: 'Admin' },
  'home.questions': { nl: 'Vragen', en: 'Questions' },
  'home.disclaimer': { nl: 'Disclaimer', en: 'Disclaimer' },
  'home.about': { nl: 'Over ons', en: 'About' },
  'settings.title': { nl: 'Instellingen', en: 'Settings' },
  'settings.bedtime': { nl: 'Bedtijd (HH:MM)', en: 'Bedtime (HH:MM)' },
  'settings.notifyBedtime': { nl: 'Herinnering bij bedtijd', en: 'Bedtime reminder' },
  'settings.notifyNew': { nl: 'Melding bij nieuwe vragen', en: 'Notification for new questions' },
  'settings.save': { nl: 'Opslaan', en: 'Save' },
  'settings.saved': { nl: 'Instellingen opgeslagen', en: 'Settings saved' },
  'settings.language': { nl: 'Taal', en: 'Language' },
  'language.nl': { nl: 'Nederlands', en: 'Dutch' },
  'language.en': { nl: 'Engels', en: 'English' },
  'admin.title': { nl: 'Admin beheer', en: 'Admin management' },
  'admin.newQuestion': { nl: 'Nieuwe vraag toevoegen', en: 'Add new question' },
  'admin.existingQuestions': { nl: 'Bestaande vragen', en: 'Existing questions' },
  'admin.dayNo': { nl: 'Dag nummer', en: 'Day number' },
  'admin.titleLabel': { nl: 'Titel', en: 'Title' },
  'admin.main': { nl: 'Hoofdvraag / opdracht', en: 'Main question / task' },
  'admin.deep': { nl: 'Verdiepingsvragen (één per regel)', en: 'Deep questions (one per line)' },
  'admin.photo': { nl: 'Foto mogelijk', en: 'Photo possible' },
  'admin.publish': { nl: 'Publiceren', en: 'Publish' },
  'admin.add': { nl: 'Toevoegen', en: 'Add' },
  'admin.edit': { nl: 'Bewerk', en: 'Edit' },
  'admin.save': { nl: 'Opslaan', en: 'Save' },
  'admin.cancel': { nl: 'Annuleren', en: 'Cancel' },
  'admin.publishYes': { nl: 'Ja', en: 'Yes' },
  'admin.publishNo': { nl: 'Nee', en: 'No' },
  'admin.added': { nl: 'Vraag toegevoegd', en: 'Question added' },
  'admin.savedMsg': { nl: 'Wijzigingen opgeslagen', en: 'Changes saved' },
  'questions.labelPossibleDeep': { nl: 'Mogelijke verdiepingsvragen:', en: 'Possible deep questions:' },
  'questions.notes': { nl: 'Antwoord / notities', en: 'Answer / notes' },
  'questions.save': { nl: 'Opslaan', en: 'Save' },
  'questions.skip': { nl: 'Overslaan', en: 'Skip' },
  'questions.flag': { nl: 'Markeer als ongepast', en: 'Flag as inappropriate' },
  'questions.statusSaved': { nl: 'Opgeslagen', en: 'Saved' },
  'questions.statusSkipped': { nl: 'Overgeslagen', en: 'Skipped' },
  'questions.statusFlagged': { nl: 'Gemarkeerd', en: 'Flagged' },
  'questions.open': { nl: 'Openen', en: 'Open' },
  'questions.promptFlagReason': {
    nl: 'Waarom vind je deze vraag ongepast of niet passend?',
    en: 'Why do you find this question inappropriate or unsuitable?'
  },
  'about.title': { nl: 'Over ons', en: 'About us' },
  'about.content': {
    nl: 'Deze applicatie helpt ouders en kinderen om samen te praten voor het slapengaan.',
    en: 'This app helps parents and children connect before bedtime.'
  },
  'disclaimer.title': { nl: 'Disclaimer', en: 'Disclaimer' },
  'disclaimer.content': {
    nl: 'De inhoud van deze applicatie is bedoeld ter inspiratie en is geen vervanging voor professioneel advies.',
    en: 'The content of this application is for inspiration and is not a substitute for professional advice.'
  }
}

/**
 * Returns the translated string for the given key and language. If the key
 * is missing, the key itself is returned. Optionally replaces placeholders
 * enclosed in {curly braces} with values provided in the params object.
 *
 * @param key The translation key, e.g. 'home.title'
 * @param lang The language code ('nl' or 'en')
 * @param params Optional parameters for interpolation
 */
export function t(key: string, lang: 'nl' | 'en', params?: Record<string, any>): string {
  const entry = translations[key]
  let str = entry ? entry[lang] || entry['nl'] : key
  if (params) {
    Object.keys(params).forEach((k) => {
      str = str.replace(new RegExp(`{${k}}`, 'g'), String(params[k]))
    })
  }
  return str
}
