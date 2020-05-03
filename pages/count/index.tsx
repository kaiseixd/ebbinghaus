import React, { useState, useEffect } from 'react'
import { Button, Statistic, Space, Card, Spin } from 'antd'
import axios from 'axios'
import moment from 'moment'

import Layout from '../../components/Layout'
import './index.less'

interface Day {
    id: number
    count: number
    date: string
}

const { Countdown } = Statistic
const now = moment().format('YY/MM/DD')

const Count: React.FC = () => {
    const [currentDate, setCurrentDate] = useState<Day>({ count: 0, date: '20/01/01', id: 20000 })
    const [dates, setDates] = useState<Day[]>([])
    const [deadline, setDeadline] = useState(0)
    const [countLoading, setCountLoading] = useState(false)

    useEffect(() => {
        getDate(now)
        getDateList()
    }, [])

    useEffect(() => {
        let date = dates.find(item => item.id === currentDate.id)
        if (date) {
            date.count = currentDate.count
            setDates([...dates])
        }
    }, [currentDate])

    async function getDate(date: string) {
        const res = await axios.get(`/api/count/date?date=${date}`)
        const dayData = res.data
        setCurrentDate(dayData.data[0])
    }

    async function getDateList() {
        const res = await axios.get('/api/count/list')
        const listData = res.data
        setDates(listData.data)
    }

    async function updateDateData(count: number) {
        setCountLoading(true)
        await axios.post('/api/count/update', {
            id: currentDate.id,
            count
        })
        await getDate(currentDate.date)
        setCountLoading(false)
    }

    function decCount() {
        if (currentDate.count > 0) {
            updateDateData(currentDate.count - 1)
        }
    }

    function addCount() {
        updateDateData(currentDate.count + 1)
    }

    function onStartCount() {
        setDeadline(Date.now() + 1000 * 60 * 25)
    }

    function onResetCount() {
        setDeadline(-1)
    }

    function onFinish() {
        if (deadline === -1) return
        updateDateData(currentDate.count + 1)
    }

    function changeCurrentDate(dateId: number) {
        const date = dates.find(item => item.id === dateId)
        if (date) {
            setCurrentDate(date)
        }
    }

    function countRender() {
        return (
            <Space className="layout-count-count">
                <Button shape="circle" onClick={decCount} disabled={countLoading}>-</Button>
                <span style={{ verticalAlign: 'middle' }}>{ currentDate.count }</span>
                <Button shape="circle" onClick={addCount} disabled={countLoading}>+</Button>
                <Spin style={{ marginLeft: 12 }} spinning={countLoading} />
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
        return (
            <Card>
                { dates.map((item, index) => (
                    <Card.Grid className="count-grid" key={index}>
                        <div onClick={() => changeCurrentDate(item.id)}>{ `Date: ${item.date.slice(3)} Count: ${item.count}` }</div>
                    </Card.Grid>
                )) }
            </Card>
        )
    }
    console.log('render')

    return (
        <Layout className="layout-count">
            <h1>Potato Count</h1>
            <h2>Use Count: { currentDate.date }</h2>
            { countRender() }
            <h2>Potato</h2>
            { potatoRender() }
            <h2>Check Date</h2>
            { dateRender() }
        </Layout>
    )
};

export default Count
