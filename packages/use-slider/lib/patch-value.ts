import { shiftPoint, Axis, getClosestPoint, getNextPoint, getPrevPoint } from '@nami-ui/utils'

export { Axis }
export type AxisCollection = { [prop: string]: Axis }

export type Value = number
export type ValueCollection = { [prop: string]: Value }

export type AbsoluteValuePatch = number
export type RelativeValuePatch = 'next' | 'prev' | string
export type ValueCollectionPatch = { [prop: string]: AbsoluteValuePatch | RelativeValuePatch | undefined } // prettier-ignore
export type ValueUpdater = (value: Value) => Value
export type ValueCollectionUpdater = (value: ValueCollection) => ValueCollection
export type ValueSetter = (value: Value | ValueCollection) => Value | ValueCollection

export type Patch =
    | AbsoluteValuePatch
    | RelativeValuePatch
    | ValueCollectionPatch
    | ValueUpdater
    | ValueCollectionUpdater
    | undefined

function isAbsoluteValuePath(patch: any): patch is AbsoluteValuePatch {
    return typeof patch === 'number'
}

function isRelativeValuePath(patch: any): patch is RelativeValuePatch {
    return typeof patch === 'string'
}

function isValueCollectionPatch(patch: any): patch is ValueCollectionPatch {
    return typeof patch === 'object'
}

function isUpdater(patch: any): patch is ValueUpdater | ValueCollectionUpdater {
    return typeof patch === 'function'
}

function isAxis(axis: any): axis is Axis {
    return typeof axis.min === 'number' && typeof axis.max === 'number'
}

function patchBasicValue(patch: Patch, axis: Axis) {
    if (isAbsoluteValuePath(patch)) {
        return () => getClosestPoint(patch, axis)
    }

    if (isRelativeValuePath(patch)) {
        switch (patch) {
            case 'next':
                return (value: Value) => getNextPoint(value, axis)
            case 'prev':
                return (value: Value) => getPrevPoint(value, axis)
            default:
                return (value: Value) => getClosestPoint(shiftPoint(value, patch), axis)
        }
    }

    return undefined
}

function patchMultipleValue(patch: Patch, axis: Axis | AxisCollection) {
    if (!isValueCollectionPatch(patch)) {
        return undefined
    }

    const entries = Object.entries(patch)

    return (value: ValueCollection) => {
        const newValue = { ...value }

        for (const [key, p] of entries) {
            if (p !== undefined) {
                const a = isAxis(axis) ? axis : axis[key]
                let v: number = value[key]

                if (isAbsoluteValuePath(p)) {
                    v = getClosestPoint(p, a)
                } else {
                    switch (p) {
                        case 'next':
                            v = getNextPoint(v, a)
                            break
                        case 'prev':
                            v = getPrevPoint(v, a)
                            break
                        default:
                            v = getClosestPoint(shiftPoint(v, p), a)
                    }
                }

                newValue[key] = v
            }
        }

        return newValue
    }
}

function patchUpdater(patch: Patch, axis: Axis | AxisCollection) {
    if (!isUpdater(patch)) {
        return undefined
    }

    return (prevValue: Value | ValueCollection) => {
        let value = patch(prevValue as any)

        if (typeof value === 'number') {
            value = getClosestPoint(value, axis as Axis)
        } else {
            for (const [key, v] of Object.entries(value)) {
                value[key] = getClosestPoint(v, isAxis(axis) ? axis : axis[key])
            }
        }
    }
}

export function patchValue(patch: Patch, axis: Axis | AxisCollection): ValueSetter {
    if (patch === undefined) {
        return (value: any) => value
    }

    return (patchBasicValue(patch, axis as Axis) ??
        patchMultipleValue(patch, axis) ??
        patchUpdater(patch, axis)) as ValueSetter
}
