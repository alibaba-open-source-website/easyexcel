/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import MDXContent from '@docusaurus/theme-classic/lib/theme/MDXContent';
import type {Props} from '@theme/MDXContent';
import classnames from 'classnames'

export default function MDXContentWrapper({children}: Props): JSX.Element {
    return (
        <>
            {/* 在加载markdown的时候加入个广告 */}
            <div className={classnames('wwads-cn', 'wwads-horizontal')} data-id="173"></div>
            <MDXContent {...{children}} />
        </>
    );
}
