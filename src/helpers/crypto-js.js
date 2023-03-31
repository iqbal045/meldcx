const CryptoJS = require('crypto-js');

const generateKeyPair = async () => {
  const privateKey = CryptoJS.lib.WordArray.random(16).toString();
  const publicKey = CryptoJS.SHA256(privateKey).toString().slice(0, 32);
  return { publicKey, privateKey };
};

module.exports = { generateKeyPair };
