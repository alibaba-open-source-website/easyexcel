import React, {useEffect} from 'react';
import Layout from '@theme/Layout';

export default function Links() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = '//linkspub.alipay.com/widgetInit/63b698507592880633dc5290';
        document.body.appendChild(script);
    }, [])
    return (
        <Layout title="专属人工答疑" description="专属人工答疑">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    fontSize: '20px',
                }}>
                <p>
                    点击右下角有个`?`，专属人工答疑，右下角是异步加载，没出来等2秒.
                </p>
            </div>
        </Layout>
    );
}