import {getRequestConfig} from 'next-intl/server';
import en from '../../messages/en.json';
import zh from '../../messages/zh.json';

const messages = {
  en,
  zh
} as const;

export default getRequestConfig(async ({locale}) => {
  // 確保 locale 有效性
  const validLocale = locale || 'en';
  const supportedLocale = validLocale in messages ? validLocale : 'en';

  return {
    messages: messages[supportedLocale as keyof typeof messages],
    locale: supportedLocale
  };
});