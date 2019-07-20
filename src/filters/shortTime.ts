/**
 * Filter that returns time (hours and minutes) from a date, formatted to in current locale
 * Examples:
 * - 1:00 AM
 * - 1:00 PM
 * - 01:00
 * - 13:00
 * @param dateValue the date value
 */
export default (dateValue: string): string => {
    if (!dateValue) {
        return '';
    } else {
        const date: Date = new Date(dateValue);
        return date.toLocaleString(['en-US'], {
            hour: 'numeric',
            minute: 'numeric'
        });
    }
};
