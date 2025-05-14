/**
 * Utility function to calculate expiration time from minutes
 * @param expireTimeInMinutes - Time in minutes until expiration
 * @returns Date object representing the expiration time
 */
const getExpireTime = (expireTimeInMinutes: number): Date => {
  return new Date(new Date().getTime() + expireTimeInMinutes * 60 * 1000);
};

export default getExpireTime;
