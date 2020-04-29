import moment from 'moment'

export function generateDate() {
    return Array(366).fill(1).map((_, index) => {
        return moment('01/01/2020').add(index, 'days').format('YY/MM/DD')
    });
}