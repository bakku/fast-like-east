const translations = {
  de: {
    january: 'Januar',
    february: 'Februar',
    march: 'März',
    april: 'April',
    may: 'Mai',
    june: 'Juni',
    july: 'Juli',
    august: 'August',
    september: 'September',
    october: 'Oktober',
    november: 'November',
    december: 'Dezember',
    monday: 'Mo',
    tuesday: 'Di',
    wednesday: 'Mi',
    thursday: 'Do',
    friday: 'Fr',
    saturday: 'Sa',
    sunday: 'So'
  },
  en: {
    january: 'January',
    february: 'February',
    march: 'March',
    april: 'April',
    may: 'May',
    june: 'June',
    july: 'July',
    august: 'August',
    september: 'September',
    october: 'October',
    november: 'November',
    december: 'December',
    monday: 'Mo',
    tuesday: 'Tu',
    wednesday: 'We',
    thursday: 'Th',
    friday: 'Fr',
    saturday: 'Sa',
    sunday: 'Su'
  }
};

const supportedLanguages = ['de', 'en'];

export default class I18n {
  static getPreferredLanguage() {
    const preferredLanguage = window.navigator.language || 'en';

    if (supportedLanguages.includes(preferredLanguage)) {
      return preferredLanguage;
    } else {
      return 'en';
    }
  }

  static t(key) {
    return translations[I18n.getPreferredLanguage()][key];
  }
}
