/**
 * Safely parses a JSON string or returns the original value if it's already an object.
 * @param {*} jsonString - The JSON string to parse or an object to return as is.
 * @returns {Object|Array|null} - The parsed object/array or null if parsing fails.
 */
const parseJSON = (jsonString) => {
  // Return null for null or undefined values
  if (jsonString == null) {
    return null;
  }

  // Return objects as is (including arrays)
  if (typeof jsonString === 'object') {
    return jsonString;
  }

  // Try to parse if it's a string
  if (typeof jsonString === 'string') {
    return JSON.parse(jsonString);
  }

  // Return null for other types (numbers, booleans, etc.)
  return null;
};

export default parseJSON;
