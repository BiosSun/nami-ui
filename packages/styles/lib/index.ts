export type Distances =
    | boolean
    | 'micor'
    | 'mini'
    | 'tiny'
    | 'small'
    | 'middle'
    | 'large'
    | 'big'
    | 'huge'
    | 'massive'

export const DISTANCE_OPTIONS = [
    false,
    true,
    'micor',
    'mini',
    'tiny',
    'small',
    'middle',
    'large',
    'big',
    'huge',
    'massive',
]

export function normalizeDistance(val: boolean | string | undefined) {
    if (val === true) {
        return 'middle'
    }

    return val
}
