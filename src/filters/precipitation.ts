/**
 * Filter that returns min, max and unit (mm) for the precipation
 * @param minValue value of precipation
 * @param maxValue value of precipation
 */
export default (minValue: string, maxValue: string): string => {
    const unit: string = 'mm';
    if (!minValue || !maxValue || maxValue === '0') {
        return '0 ' + unit;
    } else {
        return minValue + '-' + maxValue + ' ' + unit;
    }
};
