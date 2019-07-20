/**
 * Filter that returns time interval that includes weekday (short) and time (hours and minutes)
 * using current locale
 * Examples:
 * - Sat 1:00 AM - 2:00 AM
 * - Lør 01:00 - 02:00
 * @param startDateValue start date
 * @param endDateValue end date
 */
export default (startDateValue: string, endDateValue: string): string => {
    if (!startDateValue || !endDateValue) {
        return '';
    } else {
        const startDate: Date = new Date(startDateValue);
        const endDate: Date = new Date(endDateValue);
        let output: string;
        output = startDate.toLocaleString(['en-US'], {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric'
        });
        output += ' - ' + endDate.toLocaleString(['en-US'], {
            hour: 'numeric',
            minute: 'numeric'
        });
        return output;
    }
};
