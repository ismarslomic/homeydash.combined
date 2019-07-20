/**
 * Filter that returns wind speed rounded to nearest integer, with unit (m/s)
 * Examples:
 * - 0 m/s
 * - 2 m/s
 * @param speedValue of the wind
 */
export default (speedValue: string): string => {
    const unit: string = 'm/s';
    if (!speedValue) {
        return '0 ' + unit;
    } else {
        const speedInteger: number = Number.parseFloat(speedValue);
        return Math.round(speedInteger) + ' ' + unit;
    }
};
