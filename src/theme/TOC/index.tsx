/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from 'react';
import clsx from 'clsx';
import TOCItems from '@theme/TOCItems';
import type {Props} from '@theme/TOC';

import styles from '@docusaurus/theme-classic/lib/theme/TOC/styles.module.css';

import classnames from 'classnames'


// Using a custom className
// This prevents TOCInline/TOCCollapsible getting highlighted by mistake
const LINK_CLASS_NAME = 'table-of-contents__link toc-highlight';
const LINK_ACTIVE_CLASS_NAME = 'table-of-contents__link--active';

// 没找到更优雅的写法 直接复制整个类过来了 后续升级要注意
export default function TOC({className, ...props}: Props): JSX.Element {
    return (
        <div className={clsx(styles.tableOfContents, 'thin-scrollbar', className)}>
            {/* 在加载markdown的时候加入个广告 */}
            <div className={classnames('wwads-cn', 'wwads-vertical')} data-id="173"></div>

            <TOCItems
                {...props}
                linkClassName={LINK_CLASS_NAME}
                linkActiveClassName={LINK_ACTIVE_CLASS_NAME}
            />
        </div>
    );
}

