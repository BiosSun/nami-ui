import { getPrecision, toFixed, shiftPoint, Axis, getClosestPoint } from '@nami-ui/utils'

export { Axis }
export type AxisCollection = { [prop: string]: Axis }

export type Value = number
export type ValueCollection = { [prop: string]: Value }

export type AbsoluteValuePatch = number
export type RelativeValuePatch = string
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

export function patchValue(patch: Patch, axis: Axis | AxisCollection): ValueSetter {
    if (patch === undefined) {
        return (value: any) => value
    }

    return (patchBasicValue(patch, axis as Axis) ??
        patchMultipleValue(patch, axis) ??
        patchUpdater(patch, axis)) as ValueSetter
}

function patchBasicValue(patch: Patch, axis: Axis) {
    if (isAbsoluteValuePath(patch)) {
        return () => getClosestPoint(patch, axis)
    } else if (isRelativeValuePath(patch)) {
        return (value: Value) => getClosestPoint(shiftPoint(value, patch), axis)
    } else {
        return undefined
    }
}

function patchMultipleValue(patch: Patch, axis: Axis | AxisCollection) {
    if (!isValueCollectionPatch(patch)) {
        return
    }

    const entries = Object.entries(patch)

    return (value: ValueCollection) => {
        const newValue = { ...value }

        for (const [key, p] of entries) {
            if (p === undefined) {
                continue
            }

            let v = isAbsoluteValuePath(p) ? p : shiftPoint(value[key], p)
            v = getClosestPoint(v, isAxis(axis) ? axis : axis[key])

            newValue[key] = v
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
