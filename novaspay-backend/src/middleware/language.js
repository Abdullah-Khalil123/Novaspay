export const setLanguage = (req, res, next) => {
  const lang = req.headers['accept-language'];
  req.lang = lang ? lang.split(',')[0] : 'EN';
  next();
};
