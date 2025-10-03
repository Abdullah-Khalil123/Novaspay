import crypto from 'crypto';

function generateAlphaNumericCode(length = 12) {
  return crypto
    .randomBytes(length)
    .toString('base64') // letters + numbers
    .replace(/[^a-zA-Z0-9]/g, '') // keep alphanumeric
    .slice(0, length);
}
export default generateAlphaNumericCode;
