import { CSSProperties, ReactElement, useMemo, useState } from 'react'
import clsx from 'clsx'
import { HStack, StackItemProps } from '@nami-ui/stack'
import { cartesianProduct } from '@nami-ui/utils'

import { usePopper } from 'react-popper'
import { POPPER_PLACEMENTS_MAP } from './_utils'

import { usePopup } from '../lib'
import { RectAnchor } from '../lib/position'

import styles from './use-popup.stories.module.scss'

export default {
    title: 'usePopup',
    argTypes: {
        type: {
            control: { type: 'inline-radio', options: ['popup', 'popper'] },
            defaultValue: 'popup',
        },
    },
}

interface Args {
    type: 'popup' | 'popper'
}

interface ItemProps extends StackItemProps {
    my: RectAnchor
    at: RectAnchor
    className?: string // eslint-disable-line react/require-default-props
    style?: CSSProperties // eslint-disable-line react/require-default-props
}

function ItemByUsePopup({ my, at, className, style }: ItemProps) {
    const [popupEl, setPopupEl] = useState<HTMLDivElement | null>(null)
    const [targetEl, setTargetEl] = useState<HTMLDivElement | null>(null)

    const popup = usePopup(popupEl, targetEl, my, at)

    return (
        <div className={clsx(styles.container, className)} style={style}>
            <div className={styles.label}>
                <div className={styles.labelMy}>
                    my: {my[0]}, {my[1]}
                </div>
                <div className={styles.labelAt}>
                    at: {at[0]}, {at[1]}
                </div>
            </div>
            <div className={styles.target} ref={setTargetEl} />
            <div className={styles.popup} ref={setPopupEl} {...popup.popupProps} />
        </div>
    )
}

function ItemByUsePopper({ my, at, className, style }: ItemProps) {
    const [popupEl, setPopupEl] = useState<HTMLDivElement | null>(null)
    const [targetEl, setTargetEl] = useState<HTMLDivElement | null>(null)

    const popper = usePopper(targetEl, popupEl, {
        placement: POPPER_PLACEMENTS_MAP[`${my[0]} ${my[1]} | ${at[0]} ${at[1]}`],
    })

    return (
        <div className={clsx(styles.container, className)} style={style}>
            <div className={styles.label}>
                <div className={styles.labelMy}>
                    my: {my[0]}, {my[1]}
                </div>
                <div className={styles.labelAt}>
                    at: {at[0]}, {at[1]}
                </div>
            </div>
            <div className={styles.target} ref={setTargetEl} />
            <div
                className={styles.popup}
                ref={setPopupEl}
                style={popper.styles.popper}
                {...popper.attributes.popper}
            />
        </div>
    )
}

export function PositionSingle({ type }: Args): ReactElement | null {
    return type === 'popup' ? (
        <ItemByUsePopup my={['left', 'top']} at={['left', 'top']} />
    ) : (
        <ItemByUsePopper my={['left', 'top']} at={['left', 'top']} />
    )
}

export function Position({ type }: Args): ReactElement | null {
    const positionsComb = useMemo(() => {
        const positions: RectAnchor[] = cartesianProduct(
            ['left', 'center', 'right'],
            ['top', 'center', 'bottom'],
        )

        const positionsComb = cartesianProduct(positions, positions)

        return positionsComb
    }, [])

    const items = positionsComb.map(([my, at], index) =>
        type === 'popup' ? (
            <ItemByUsePopup $col={8} key={index} my={my} at={at} />
        ) : (
            <ItemByUsePopper $col={8} key={index} my={my} at={at} />
        ),
    )

    return (
        <HStack wrap spacing>
            {items}
        </HStack>
    )
}
