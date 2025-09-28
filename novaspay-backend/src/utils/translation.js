/**
 * Flattens translation fields (name, description, etc.) into the parent object.
 * Completely removes the `translations` array from the result.
 *
 * @param {Array} items - Array of objects with a `translations` array
 * @param {string} lang - Language code to use, fallback to EN
 * @returns {Array} Cleaned and flattened objects
 */
export const flattenTranslation = (items, lang = 'EN') => {
  const upperLang = lang.toUpperCase();

  return items.map(({ translations, ...rest }) => {
    const preferred = translations.find((t) => t.language === upperLang);
    const fallback = translations.find((t) => t.language === 'EN');
    const translation = preferred || fallback;

    if (!translation) {
      return {
        ...rest,
        name: null,
        description: null,
        language: null,
      };
    }

    const { name, description, language } = translation;

    return {
      ...rest, // keeps game.id, slug, imageUrl, etc.
      name,
      description,
      language,
    };
  });
};

/**
 * Flattens SEO fields into the parent object based on preferred language.
 * Removes the `seo` array from the result.
 *
 * @param {Array} items - Array of game objects with `seo` array
 * @param {string} lang - Preferred language code, fallback to EN
 * @returns {Array} Flattened result with SEO fields
 */
export const flattenSeo = (items, lang = 'EN') => {
  const upperLang = lang.toUpperCase();

  return items.map(({ seo, ...rest }) => {
    const preferred = seo.find((s) => s.language === upperLang);
    const fallback = seo.find((s) => s.language === 'EN');
    const seoEntry = preferred || fallback;

    if (!seoEntry) {
      return {
        ...rest,
        metaTitle: null,
        metaDescription: null,
        introduction: null,
        keywords: [],
      };
    }

    const { metaTitle, metaDescription, introduction, keywords } = seoEntry;

    return {
      ...rest,
      metaTitle,
      metaDescription,
      introduction,
      keywords,
      language: seoEntry.language || upperLang, // Ensure language is set
    };
  });
};

/**
 * Transforms games by flattening their SEO and service translations.
 *
 * @param {Array} games - Array of game objects with nested translations and SEO.
 * @param {string} lang - Preferred language code (e.g., 'EN', 'FR').
 * @returns {Array} Transformed games with flattened translations and SEO.
 */

export const transformGamesWithLang = (games, lang) => {
  return games.map((game) => {
    const seoTranslation =
      game.seo?.find((t) => t.language === lang) ||
      game.seo?.find((t) => t.language === 'EN') ||
      {};

    return {
      ...game,
      services:
        game.services?.map((service) => {
          const translation =
            service.translations?.find((t) => t.language === lang) ||
            service.translations?.find((t) => t.language === 'EN') ||
            {};

          return {
            id: service.id,
            type: service.type,
            name: translation.name || '',
            description: translation.description || '',
          };
        }) || [],
      seo: {
        metaTitle: seoTranslation.metaTitle || '',
        metaDescription: seoTranslation.metaDescription || '',
        introduction: seoTranslation.introduction || '',
        keywords: seoTranslation.keywords || [],
      },
    };
  });
};
