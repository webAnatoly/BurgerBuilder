let counter = Math.random();

const getUniqueRandomNumber = () => {
  const randomNumber = counter;
  counter += 0.1;
  return randomNumber;
};

export default getUniqueRandomNumber;
