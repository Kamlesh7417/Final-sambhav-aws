import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const LanguageSelector: React.FC = () => {
  const { t, i18n } = useTranslation();

  const languages = {
    en: { name: t('english'), flag: '🇬🇧' },
    hi: { name: t('hindi'), flag: '🇮🇳' },
    ta: { name: t('tamil'), flag: '🇮🇳' },
    te: { name: t('telugu'), flag: '🇮🇳' },
    bn: { name: t('bengali'), flag: '🇮🇳' },
    gu: { name: t('gujarati'), flag: '🇮🇳' },
    kn: { name: t('kannada'), flag: '🇮🇳' },
    ml: { name: t('malayalam'), flag: '🇮🇳' },
    mr: { name: t('marathi'), flag: '🇮🇳' },
    pa: { name: t('punjabi'), flag: '🇮🇳' }
  };

  return (
    <div className="relative group">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100"
      >
        <GlobeAltIcon className="h-5 w-5 text-gray-600" />
        <span className="text-sm text-gray-700">
          {languages[i18n.language as keyof typeof languages]?.name || languages.en.name}
        </span>
      </motion.button>

      <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {Object.entries(languages).map(([code, { name, flag }]) => (
            <motion.button
              key={code}
              whileHover={{ x: 4 }}
              onClick={() => i18n.changeLanguage(code)}
              className={`w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-left text-sm ${
                i18n.language === code
                  ? 'bg-primary-50 text-primary-600'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <span>{flag}</span>
              <span>{name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;