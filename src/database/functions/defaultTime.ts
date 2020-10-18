export function defaultTime(): Date {
    const date = new Date()
    date.setMinutes(date.getMinutes() + 30)
    return date
}