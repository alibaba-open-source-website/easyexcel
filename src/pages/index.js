/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
    {
        title: '快速',
        imageUrl: 'img/undraw_docusaurus_mountain.svg',
        description: (
            <>
                快速的读取<code>excel</code>中的数据。
            </>
        ),
    },
    {
        title: '简洁',
        imageUrl: 'img/undraw_docusaurus_tree.svg',
        description: (
            <>
                映射<code>excel</code>和实体类，让代码变的更加简洁。
            </>
        ),
    },
    {
        title: '大文件',
        imageUrl: 'img/undraw_docusaurus_react.svg',
        description: (
            <>
                在读写大文件的时候使用磁盘做缓存，更加的节约内存。
            </>
        ),
    },
];

function Feature({imageUrl, title, description}) {
    const imgUrl = useBaseUrl(imageUrl);
    return (
        <div className={clsx('col col--4', styles.feature)}>
            {imgUrl && (
                <div className="text--center">
                    <img className={styles.featureImage} src={imgUrl} alt={title}/>
                </div>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    );
}

export default function Home() {
    const context = useDocusaurusContext();
    const {siteConfig = {}} = context;
    return (
        <Layout
            // 首页的标题
            title={`EasyExcel官方文档 - 基于Java的Excel处理工具`}
            // 首页的description
            description="EasyExcel是一个基于Java的，快速、简洁、解决大文件内存溢出的Excel处理工具。他能让在不用考虑性能、内存的等因素的情况下，快速完成Excel的读、写等功能。">
            <header className={clsx('hero hero--primary', styles.heroBanner)}>
                <div className="container">
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={styles.buttons}>
                        <Link
                            className={clsx(
                                'button button--outline button--secondary button--lg',
                                styles.getStarted,
                            )}
                            to={useBaseUrl('/docs/current/')}>
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {features && features.length > 0 && (
                    <section className={styles.features}>
                        <div className="container">
                            <div className="row">
                                {features.map(({title, imageUrl, description}) => (
                                    <Feature
                                        key={title}
                                        title={title}
                                        imageUrl={imageUrl}
                                        description={description}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </Layout>
    );
}
