import moment from 'moment'

export function defaultTime(): string {
    const date = moment()
    date.add(30, 'm')
    return date.toISOString()
}