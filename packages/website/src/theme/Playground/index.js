import React, { useState } from 'react'
import clsx from 'clsx'
import { useView, Compiler, Editor, Error } from 'react-view'
import * as NamiUIComponents from 'nami-ui'
import { Up as IconUp, Down as IconDown } from 'nami-ui'
import usePrismTheme from '@theme/hooks/usePrismTheme'
import IconBoxList from '@theme/IconBoxList'
import Box from '@theme/Box'
import DemoActions from '@theme/DemoActions'

import styles from './styles.module.scss'

export default function Playground({ initialCode }) {
    const [isExpand, setExpand] = useState(false)

    const params = useView({
        initialCode: initialCode.trim(),
        scope: { React, ...React, clsx, IconBoxList, Box, DemoActions, ...NamiUIComponents },
        onUpdate: console.log,
    })

    const prismTheme = usePrismTheme()

    return (
        <div className={styles.playground}>
            <Compiler className={styles.compiler} {...params.compilerProps} />
            <button
                className={clsx(styles.toggle, { [styles.toggleActive]: isExpand })}
                onClick={() => setExpand(!isExpand)}
            >
                {isExpand ? (
                    <IconUp className={styles.toggleIcon} />
                ) : (
                    <IconDown className={styles.toggleIcon} />
                )}
                {isExpand ? '隐藏' : '展开'}代码
            </button>
            {isExpand ? (
                <>
                    <Editor theme={prismTheme} className={styles.editor} {...params.editorProps} />
                    <Error className={styles.error} {...params.errorProps} />
                </>
            ) : null}
        </div>
    )
}
