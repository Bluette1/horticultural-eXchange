import CryptoJS from 'crypto-js';

const md5FromFile = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();

  reader.onload = (fileEvent) => {
    const binary = CryptoJS.lib.WordArray.create(fileEvent.target.result);
    const md5 = CryptoJS.MD5(binary);
    resolve(md5);
  };
  reader.onerror = () => {
    reject(new Error('Something went wrong with the file reader.'));
  };

  reader.readAsArrayBuffer(file);
});

const fileChecksum = async (file) => {
  const md5 = await md5FromFile(file);
  const checksum = md5.toString(CryptoJS.enc.Base64);
  return checksum;
};

export default fileChecksum;
