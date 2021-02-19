import { ComponentType, HTMLAttributes, useMemo, Children, ReactNode, isValidElement } from 'react' // prettier-ignore
import clsx from 'clsx'
import { Distances, normalizeDistance } from '@nami-ui/styles'
import { StackContext, StackContextType } from './context'
import './stack.scss'

// TODO 能否将这段代码放到一个 .d.ts 文件中？
declare module 'react' {
    interface HTMLAttributes<T> extends StackItemProps {}
}

type StackComponentProps = {
    className?: string
}

// TODO 按理，应当该该类型放入 @nami-ui/styles 模块中
type Padding = Distances | { horizontal?: Distances, vertical?: Distances, top?: Distances, right?: Distances, bottom?: Distances, left?: Distances } // prettier-ignore
type Spacing = Distances | { horizontal?: Distances; vertical?: Distances }

export interface StackProps extends HTMLAttributes<HTMLElement> {
    /** 组件根元素 */
    component?: string | ComponentType<StackComponentProps>
    /** 布局方向 */
    direction?: 'horizontal' | 'vertical'
    /** 主轴对齐方式 */
    justify?: 'start' | 'end' | 'center' | 'between' | 'around'
    /** 副轴对齐方式 */
    align?: 'start' | 'end' | 'center' | 'stretch'
    /** 组件与其子元素之间的间距 */
    padding?: Padding
    /** 子元素与子元素之间的间距 */
    spacing?: Spacing
    /** 是否允许换行 */
    wrap?: boolean
}

function generatePaddingClassName(padding: Padding) {
    const prefix = 'nami-stack--padding'

    switch (typeof padding) {
        case 'boolean':
            return padding ? `${prefix}-middle` : undefined
        case 'string':
            return `${prefix}-${padding}`
        case 'object': {
            const { horizontal, vertical, top, right, bottom, left } = padding

            return clsx({
                [`${prefix}-horizontal-${normalizeDistance(horizontal)}`]: horizontal,
                [`${prefix}-vertical-${normalizeDistance(vertical)}`]: vertical,
                [`${prefix}-top-${normalizeDistance(top)}`]: top,
                [`${prefix}-right-${normalizeDistance(right)}`]: right,
                [`${prefix}-bottom-${normalizeDistance(bottom)}`]: bottom,
                [`${prefix}-left-${normalizeDistance(left)}`]: left,
            })
        }
        default:
            return undefined
    }
}

function generateSpacingClassName(spacing: Spacing) {
    const prefix = 'nami-stack--spacing'

    switch (typeof spacing) {
        case 'boolean':
            return spacing ? `${prefix}-middle` : undefined
        case 'string':
            return `${prefix}-${spacing}`
        case 'object': {
            const { horizontal, vertical } = spacing

            return clsx({
                [`${prefix}-horizontal-${normalizeDistance(horizontal)}`]: horizontal,
                [`${prefix}-vertical-${normalizeDistance(vertical)}`]: vertical,
            })
        }
        default:
            return undefined
    }
}

export function Stack({
    component: Component = 'div',
    direction = 'horizontal',
    justify,
    align,
    padding = false,
    spacing = false,
    wrap = false,
    className,
    children,
    ...otherProps
}: StackProps) {
    const context = useMemo<StackContextType>(() => ({ direction: direction }), [direction])

    const paddingClassName = useMemo(() => {
        return generatePaddingClassName(padding)
    }, [padding])

    const spacingClassName = useMemo(() => {
        return generateSpacingClassName(spacing)
    }, [spacing])

    className = clsx(
        'nami-stack',
        `nami-stack--${direction}`,
        {
            [`nami-stack--justify-${justify}`]: justify,
            [`nami-stack--align-${align}`]: align,
            [`nami-stack--wrap`]: wrap,
        },
        paddingClassName,
        spacingClassName,
        className,
    )

    return (
        <StackContext.Provider value={context}>
            <Component className={className} {...otherProps}>
                {Children.map(children, item)}
            </Component>
        </StackContext.Provider>
    )
}

export interface StackItemProps {
    /** 是否为弹性元素，可以定制弹性相关参数，同 CSS 的 `flex` 属性，默认为 `flex: 1 1 auto` */
    $flex?: boolean | string
    /** 指定该元素所占栅格列数 */
    $col?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 // prettier-ignore
    /** 单独为该元素指定副轴对齐方式 */
    $align?: 'start' | 'end' | 'center' | 'stretch'
}

function item(child: ReactNode): ReactNode {
    if (!isValidElement(child)) {
        return child
    }

    const { className, style, $flex: flex, $col: col, $align: align, ...otherProps } = child.props

    const colSuffix = `-${col}`
    const alignSuffix = `-${align}`

    const closed = (
        <child.type
            // 因为需要删除子元素上的 $flex, $col 及 $align 三个属性，因此无法使用 React.cloneElement，
            // 虽然官方文档中在说明 clonseElement 时有提到其几乎与 `<element.type {...element.props} />` 相同，
            // 但除了文档中说的 `ref` 之外，还有几个属性是需要注意的：
            //     https://github.com/facebook/react/blob/master/packages/react/src/ReactElement.js#L360-L381
            key={child.key}
            ref={(child as any).ref}
            __self={(child as any).__self}
            __source={(child as any).__source}
            className={clsx(
                'nami-stack__item',
                {
                    [`nami-stack__item--flex`]: flex,
                    [`nami-stack__item--col`]: col != null,
                    [`nami-stack__item--col${colSuffix}`]: col != null,
                    [`nami-stack__item--align${alignSuffix}`]: align,
                },
                className,
            )}
            style={typeof flex !== 'string' ? style : { ...style, flex }}
            {...otherProps}
        />
    )

    return closed
}
