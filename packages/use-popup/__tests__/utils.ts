import { positionRect, positionSingle } from '../lib/position'

describe('positionSingle', () => {
    test('common', () => {
        const el = { start: 0, length: 2 }
        const of = { start: 2, length: 4 }

        expect(positionSingle(el, of, 'center', 'center')).toStrictEqual(3)
        expect(positionSingle(el, of, 'start', 'center')).toStrictEqual(4)
        expect(positionSingle(el, of, 'end', 'center')).toStrictEqual(2)

        expect(positionSingle(el, of, 'center', 'start')).toStrictEqual(1)
        expect(positionSingle(el, of, 'start', 'start')).toStrictEqual(2)
        expect(positionSingle(el, of, 'end', 'start')).toStrictEqual(0)

        expect(positionSingle(el, of, 'center', 'end')).toStrictEqual(5)
        expect(positionSingle(el, of, 'start', 'end')).toStrictEqual(6)
        expect(positionSingle(el, of, 'end', 'end')).toStrictEqual(4)
    })
})

describe('positionRect', () => {
    test('common', () => {
        const el = { top: 0, left: 0, width: 2, height: 3 }
        const of = { top: 2, left: 3, width: 4, height: 5 }

        expect(positionRect(el, of, ['center', 'center'], ['center', 'center'])).toStrictEqual({ top: 3, left: 4 })
        expect(positionRect(el, of, ['left', 'top'], ['left', 'top'])).toStrictEqual({ top: 2, left: 3 })
        expect(positionRect(el, of, ['left', 'top'], ['right', 'bottom'])).toStrictEqual({ top: 7, left: 7 })
    })
})
