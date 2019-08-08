import moment from 'moment';

function FromNowFilter(date: string, dateNow?: Date): string {
    return moment(date).fromNow();
}

function CalendarTimeFilter(date: string): string {
    return moment(date).calendar();
}

export { FromNowFilter, CalendarTimeFilter };
