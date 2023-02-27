import React, {useEffect, useState} from "react";
import {uuid} from "../utils/utils";
import {getStatisticHttp} from "../api/quiz.api";
import {IStatistic} from "../api/quiz.interface";
import {Card, Table} from "antd";
import {columns} from "../api/statistic.table";
import css from './EditQuize.module.css';

export const ResultQuiz = (): JSX.Element => {
    const [statistics, setStatistics] = useState<IStatistic[]>([]);
    useEffect(() => {
        getStatisticHttp().then(res => {
            setStatistics(res.data);
        })
    }, []);
    return (
        <Card className={css.main_wrapper}>
            {statistics.map((statistic) =>
                <div key={uuid()}>
                    <h1 className={css.table_title}>{statistic.office}</h1>
                    <Table pagination={{pageSize: 5}} rowKey={'id'} dataSource={statistic.scores}
                           columns={columns}/>
                </div>)}

        </Card>
    );
}