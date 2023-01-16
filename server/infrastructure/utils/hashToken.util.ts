const cryp = require('crypto');

// Used to hash the token before saving it to the DB
export const hashToken = (token: string) => {
  return cryp.createHash('sha512').update(token).digest('hex');
}