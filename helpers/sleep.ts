export const sleep = async (miliseconds): Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, miliseconds);
  });
};
