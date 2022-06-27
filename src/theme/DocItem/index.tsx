/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import DocItem from '@docusaurus/theme-classic/lib/theme/DocItem';
import type {Props} from '@theme/DocItem';

function DocItemWrapper(props: Props): JSX.Element {
    return (
        <>
            <div className="wwads-cn wwads-horizontal" data-id="173"></div>
            <DocItem {...props} />
        </>
    );
}

export default DocItemWrapper;
