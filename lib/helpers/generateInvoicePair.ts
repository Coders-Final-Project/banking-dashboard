export const generateRandomStringNumberPair = () => {
  const randomString =
    String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
    String.fromCharCode(65 + Math.floor(Math.random() * 26));

  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  const randomPair = `${randomString}-${randomNumber}`;

  return randomPair;
};
