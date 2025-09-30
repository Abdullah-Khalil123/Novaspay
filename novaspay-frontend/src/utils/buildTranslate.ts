import { supportedLanguages } from './languages';

type Translation = {
  column: string;
  type: string;
  content: string;
};

export function buildTranslations(
  data: any,
  fields: string[],
  langs: string[] = supportedLanguages.map((lang) => lang.code)
) {
  const result: Record<string, Record<string, string>> = {};

  if (!data) return result;
  fields.forEach((field) => {
    result[field] = {};

    langs.forEach((lang) => {
      if (lang === 'en') {
        result[field][lang] = data[field] ?? '';
      } else {
        result[field][lang] =
          data?.translate_descriptions?.find(
            (t: Translation) => t.column === field && t.type === lang
          )?.content || '';
      }
    });
  });

  return result;
}
