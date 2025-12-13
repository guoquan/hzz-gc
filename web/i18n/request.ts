import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically comes from the `[locale]` segment
  let locale = await requestLocale;
 
  // Ensure that a valid locale is used
  if (!locale || !['en', 'zh'].includes(locale)) {
    locale = 'zh'; // Default to Chinese
  }
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
