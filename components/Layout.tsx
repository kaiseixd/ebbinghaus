import * as React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Breadcrumb } from 'antd';

type Props = {
    title?: string
    className?: string
}

const Layout: React.FC<Props> = ({
    children,
    className,
}) => (
    <div className={className}>
        <Head>
            <title>Ebbinghaus</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <Breadcrumb>
            <Breadcrumb.Item>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link href="/count">
                    <a>Potato Count</a>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
                <Link href="/ebbinghaus">
                    <a>Ebbinghaus</a>
                </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>.</Breadcrumb.Item>
        </Breadcrumb>
        {children}
    </div>
)

export default Layout
