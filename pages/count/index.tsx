import React, { useState, useEffect } from 'react'
import { Button, Statistic, Space, Card } from 'antd'
import axios from 'axios'

import Layout from '../../components/Layout'
import './index.less'

interface Day {
    count: number
    date: string
    index: number
}
interface IDate {
    count: number
    date: string
}

const { Countdown } = Statistic

const Count: React.FC = () => {
    const [day, setDay] = useState<Day>({ count: 0, date: '20/01/01', index: 0 })
    const [dates, setDates] = useState<IDate[]>([])
    const [deadline, setDeadline] = useState(0)

    useEffect(() => {
        getDateList()
    }, [])

    async function getDateList() {
        const res = await axios.get('/api/count/list')
        const dayData = res.data
        setDay(dayData.data.day)
        setDates(dayData.data.list)
    }

    async function setDateData(count: number) {
        await axios.post('/api/count/set', {
            date: day.date,
            count
        })
        await getDateList()
    }

    function decCount() {
        if (day.count > 0) {
            setDateData(day.count - 1)
        }
    }

    function addCount() {
        setDateData(day.count + 1)
    }

    function onStartCount() {
        setDeadline(Date.now() + 1000 * 60 * 25)
    }

    function onResetCount() {
        setDeadline(-1)
    }

    function onFinish() {
        if (deadline === -1) return
        // setCount(count + 1)
    }

    function countRender() {
        return (
            <Space className="layout-count-count">
                <Button shape="circle" onClick={decCount}>-</Button>
                <span style={{ verticalAlign: 'middle' }}>{ day.count }</span>
                <Button shape="circle" onClick={addCount}>+</Button>
            </Space>
        )
    }

    function potatoRender() {
        return (
            <Space className="layout-count-potato">
                <Countdown format="mm:ss" value={deadline} onFinish={onFinish} />
                <Button type="primary" shape="round" onClick={onStartCount}>Start Count</Button>
                <Button shape="round" onClick={onResetCount}>Stop</Button>
            </Space>
        )
    }

    function dateRender() {
        const list = dates.slice(day.index - 100, day.index).reverse()
        return (
            <Card>
                { list.map((item, index) => (
                    <Card.Grid className="count-grid" key={index}>{ `Date: ${item.date.slice(3)} Count: ${item.count}` }</Card.Grid>
                )) }
            </Card>
        )
    }

    return (
        <Layout className="layout-count">
            <h1>Potato Count</h1>
            <h2>Use Count: { day.date }</h2>
            { countRender() }
            <h2>Potato</h2>
            { potatoRender() }
            <h2>Check Date</h2>
            { dateRender() }
        </Layout>
    )
};

export default Count
