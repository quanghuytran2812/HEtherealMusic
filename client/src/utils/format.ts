export const formatDate = (dob: { year: number; month: number; day: number }): string => {
  const formattedMonth = String(dob.month).padStart(2, '0'); // Ensure month is 2 digits
  const formattedDay = String(dob.day).padStart(2, '0'); // Ensure day is 2 digits
  return `${dob.year}-${formattedMonth}-${formattedDay}`;
}