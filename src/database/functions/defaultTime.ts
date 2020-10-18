import moment from 'moment'

export function defaultTime(): number {
    const date = moment()
    date.add(30, 'm')
    const msdate = date.valueOf()
    return msdate
}