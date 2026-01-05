import { 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSunday, 
  format 
} from 'date-fns'; // Ensure you ran 'npm install date-fns'

/**
 * Generates an array of Sundays for a specific month
 * @param {string} monthStr - Format "YYYY-MM" (e.g., "2026-01")
 */
export function getSundaysInMonth(monthStr) {
  if (!monthStr) return [];

  const [year, month] = monthStr.split('-').map(Number);
  const start = startOfMonth(new Date(year, month - 1));
  const end = endOfMonth(start);

  const days = eachDayOfInterval({ start, end });

  // Filter only Sundays and map them to our Sabha structure
  const sundays = days
    .filter(isSunday)
    .map((date, index) => ({
      date: format(date, 'yyyy-MM-dd'),
      displayDate: format(date, 'do MMMM'),
      sabhaNumber: index + 1, // Sabha 1, Sabha 2, etc.
      monthYear: format(date, 'MMMM yyyy') // e.g., "January 2026"
    }));

  return sundays;
}

/**
 * Formats a date string to a readable format
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
};