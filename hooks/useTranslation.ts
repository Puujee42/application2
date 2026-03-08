import { useLanguage } from '@/context/LanguageContext';
import mnTranslations from '@/dictionaries/mn.json';
import enTranslations from '@/dictionaries/en.json';

// Ensure we have objects even if JSON import fails for some reason
const mn = mnTranslations || {};
const en = enTranslations || {};

type TranslationKey = keyof typeof mn;
type NestedKey<T> = T extends object ? keyof T : never;

export function useTranslation() {
  const { language } = useLanguage();
  
  // Choose dictionary based on language
  const translations = (language === 'MN' ? mn : en) as any;
  
  function t<K extends TranslationKey>(
    section: K,
    key: NestedKey<typeof mn[K]>
  ): string {
    try {
      if (!translations) return key as string;
      
      const sectionData = translations[section];
      if (!sectionData) {
        // Fallback to other language if current one is missing section
        const fallbackTranslations = (language === 'MN' ? en : mn) as any;
        const fallbackSectionData = fallbackTranslations?.[section];
        if (fallbackSectionData?.[key]) return fallbackSectionData[key];
        return key as string;
      }
      
      const value = sectionData[key];
      if (value === undefined || value === null) {
        // Fallback to other language if current one is missing key
        const fallbackTranslations = (language === 'MN' ? en : mn) as any;
        if (fallbackTranslations?.[section]?.[key]) return fallbackTranslations[section][key];
        return key as string;
      }
      
      return value;
    } catch (error) {
      console.error('Translation error:', error);
      return key as string;
    }
  }
  
  return { t, language };
}
