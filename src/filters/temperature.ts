/**
 * Filter that returns temperature value rounded to nearest integer.
 * NOTE! This filter does NOT return temperatureValue sign NOR symbol (C or F)
 * @param temperatureValue value of the temperature
 */
export default (temperatureValue: string): string => {
    if (!temperatureValue) {
        return '';
    } else {
        const temperatureInteger: number = Number.parseFloat(temperatureValue);
        return Math.round(temperatureInteger).toString();
    }
};
