import React, { useState, useEffect } from 'react'
import { GetStaticProps } from 'next'
import { Button, Statistic, Space } from 'antd'

import Layout from '../../components/Layout'
import './index.less'

interface Props {
    initCount: number
}

const { Countdown } = Statistic

const Count: React.FC<Props> = ({ initCount }) => {
    const [count, setCount] = useState(0)
    const [deadline, setDeadline] = useState(0)

    useEffect(() => {
        setCount(initCount)
    }, [initCount])

    function decCount() {
        if (count > 0) {
            setCount(count - 1)
        }
    }

    function addCount() {
        setCount(count + 1)
    }

    function onStartCount() {
        setDeadline(Date.now() + 1000 * 60 * 25)
    }

    function onResetCount() {
        setDeadline(-1)
    }

    function onFinish() {
        if (deadline === -1) return
        setCount(count + 1)
    }

    function countRender() {
        return (
            <Space className="layout-count-count">
                <Button shape="circle" onClick={decCount}>-</Button>
                <span style={{ verticalAlign: 'middle' }}>{ count }</span>
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

    // function dayPickerRender() {

    // }

    return (
        <Layout className="layout-count">
            <h1>Potato Count</h1>
            <h2>Use Count</h2>
            { countRender() }
            <h2>Potato</h2>
            { potatoRender() }
            <h2>Check Data</h2>
        </Layout>
    )
};

export const getStaticProps: GetStaticProps = async () => {
  const initCount = 0
  return { props: { initCount } }
}

export default Count
