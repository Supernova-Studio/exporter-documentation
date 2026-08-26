// Pure-JS atob for the Pulsar SES runtime, which provides neither the atob
// global nor Buffer. Wired through webpack ProvidePlugin so dependencies that
// assume a global atob (entities, via sanitize-html) resolve to this instead.

const BASE64 =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

module.exports = function atob(input) {
  const str = String(input).replace(/[=]+$/, '');
  let output = '';

  for (let bitCount = 0, bits = 0, index = 0; index < str.length; index += 1) {
    const charIndex = BASE64.indexOf(str.charAt(index));
    if (charIndex === -1) {
      continue;
    }

    bits = bitCount % 4 ? bits * 64 + charIndex : charIndex;
    const emit = bitCount % 4;
    bitCount += 1;

    if (emit) {
      output += String.fromCharCode(255 & (bits >> ((-2 * bitCount) & 6)));
    }
  }

  return output;
};
