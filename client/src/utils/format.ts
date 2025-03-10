export const formatDate = (dob: { year: number; month: number; day: number }): string => {
  const formattedMonth = String(dob.month).padStart(2, '0'); // Ensure month is 2 digits
  const formattedDay = String(dob.day).padStart(2, '0'); // Ensure day is 2 digits
  return `${dob.year}-${formattedMonth}-${formattedDay}`;
}

export const convertSecondsToDuration = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes} min ${seconds} sec`;
};

export const msToTimeCode = (ms: number): string => {
  const minutes = Math.floor(ms / 60);
  const seconds = ms % 60;

  return `${minutes}:${seconds}`;
}