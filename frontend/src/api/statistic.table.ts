import {ColumnsType} from 'antd/es/table';

export interface IDataTableElement {
    [key: string]: string | string[] | undefined | boolean | number;
}


export const columns: ColumnsType<any> = [
    {
        title: 'Telegram id',
        dataIndex: 'telegramId',
        key: 'telegramId',
    },
    {
        title: 'User name',
        dataIndex: 'userName',
        key: 'userName',
    },
    {
        title: 'Score',
        dataIndex: 'score',
        key: 'score',
        sorter: (a, b) => a.score - b.score,
    },
    {
        title: 'Quiz name',
        dataIndex: 'quizName',
        key: 'quizName',
        showSorterTooltip: false,
        sorter: (a, b) => {
            if (a.quizName === b.quizName) return 0;
            return a.quizName > b.quizName ? 1 : -1;
        },
    },
    {
        title: 'Time',
        dataIndex: 'time',
        key: 'time',
    },
];

