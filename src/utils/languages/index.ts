// import i18n, { CustomTypeOptions } from 'i18next';
// import { initReactI18next, useTranslation } from 'react-i18next';
// import en from './translation/en';
// import jp from './translation/jp';

// type Namespace = CustomTypeOptions['resources'];

// const resources = {
//   en,
//   jp,
// };

// i18n.use(initReactI18next).init({
//   compatibilityJSON: 'v3',
//   lng: 'en',
//   fallbackLng: 'jp',
//   defaultNS: 'common',
//   returnNull: false,
//   resources,
//   interpolation: {
//     escapeValue: false,
//   },
//   keySeparator: false,
// });

// export const useAppTranslation = <T extends keyof Namespace>(namespace: T | T[]) => {
//   const { t } = useTranslation(Array.isArray(namespace) ? namespace : [namespace]);

//   const translate = (
//     key: T extends number[]
//       ? `${T[number]}:${string & keyof Namespace[T[number]]}`
//       : `${T}:${string & keyof Namespace[T]}`
//   ): string => {
//     return t(key as any);
//   };

//   return translate;
// };
