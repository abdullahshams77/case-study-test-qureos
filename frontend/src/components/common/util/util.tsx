export function formatDate(dateString:any) {
  // Check if the input matches the expected format (dd-mm-yyyy)
  if (!/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
      return ''; // Return empty string for invalid format
  }

  // Split the input date string (dd-mm-yyyy)
  let [day, month, year] = dateString.split('-');

  // Validate if the parts form a valid date
  let dateObject = new Date(`${year}-${month}-${day}`);
  if (isNaN(dateObject.getTime())) {
      return ''; // Return empty string for invalid date
  }

  // Convert the month number to month name abbreviation
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  let formattedMonth = monthNames[parseInt(month) - 1]; // Month is 1-based, array is 0-based

  // Extract last two digits of the year
  let shortYear = year.slice(-2);

  // Return the formatted date
  return `${day}-${formattedMonth}-${shortYear}`;
}

export function correctQueryString(queryString: string) {
  // Find the index of the first question mark
  const firstQuestionMarkIndex = queryString.indexOf("?");

  // If no question mark is found, return the string as is
  if (firstQuestionMarkIndex === -1) {
    return queryString;
  }

  // Replace all subsequent question marks with ampersands
  const cleanedString = queryString
    .slice(firstQuestionMarkIndex + 1)
    .replace(/\?/g, "&");

  // Reconstruct the string with only the first question mark
  return queryString.slice(0, firstQuestionMarkIndex + 1) + cleanedString;
}

export const differenceBetweenDatesInMinutes = (
  startDate: any,
  endDate: any
) => {
  const date1: any = new Date(startDate);
  const date2: any = new Date(endDate);
  const ms: any = Math.abs(date2 - date1);
  var diffMins = Math.round(((ms % 86400000) % 3600000) / 60000); // minutes
  return diffMins;
};

export const habitPriorities = [
  { label: "Low", value: "0" },
  { label: "Medium", value: "1" },
  { label: "High", value: "2" },
];

export const sortOptions = [
  { label: "Date", value: "creationDate" },
  { label: "Streak", value: "streak" },
  { label: "Priority", value: "priority" },
];

export const durationOptions = [
  { label: "All", value: "-1" },
  { label: "Past Week", value: "pastWeek" },
];
export function getSubtractedDate(daysToSubtract:any) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - daysToSubtract);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
export function calculateDayDifference(date1: Date, date2: Date): number {
  const normalizedDate1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
  const normalizedDate2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
  
  return Math.floor((normalizedDate1.getTime() - normalizedDate2.getTime()) / (1000 * 3600 * 24));
}

