export const generateRandomNumber = (nbre:number): string => {
  const randomNumber = Math.floor(Math.random() * 10*nbre);
  const paddedNumber = randomNumber.toString().padStart(nbre, "0");
  return paddedNumber;
};
