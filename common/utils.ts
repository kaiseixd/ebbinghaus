import moment from 'moment';

interface CountArrayData {
    index: number;
    count: number;
    date: string;
}

export function generateDate() {
    return Array(366).fill(1).map((_, index) => {
        return moment('01/01/2020').add(index, 'days').format('YY/MM/DD');
    });
}

export function countArrayToSql(arr: CountArrayData[]) {
    return arr.map((item, index) => `INSERT INTO \`count\` VALUES (${20000 + index}, ${item.count}, '${item.date}');`).join('\n');
}
