import { getNextPoint, getPrevPoint } from '../lib/axis-points'

describe('getNextPoint', () => {
    test('self', () => {
        // const axis = { min: 0, max: 1, step: 0.05, points: [0.22, 0.48] }
        const axis = { min: 0, max: 1, step: 0.05 }
        expect(getNextPoint(0.15, axis)).toBe(0.2)
        expect(getPrevPoint(0.55, axis)).toBe(0.5)
    })

    test('no step, no points', () => {
        const axis = { min: 0, max: 1 }
        expect(getNextPoint(-1, axis)).toBe(0)
        expect(getNextPoint(0, axis)).toBe(0.01)
        expect(getNextPoint(0.005, axis)).toBe(0.015)
        expect(getNextPoint(0.01, axis)).toBe(0.02)
        expect(getNextPoint(0.995, axis)).toBe(1)
        expect(getNextPoint(1, axis)).toBe(1)
        expect(getNextPoint(1.2, axis)).toBe(1.2)
    })

    test('only step', () => {
        const axis = { min: 0, max: 100, step: 30 }
        expect(getNextPoint(-1, axis)).toBe(0)
        expect(getNextPoint(0, axis)).toBe(30)
        expect(getNextPoint(15, axis)).toBe(30)
        expect(getNextPoint(30, axis)).toBe(60)
        expect(getNextPoint(89, axis)).toBe(90)
        expect(getNextPoint(90, axis)).toBe(90)
        expect(getNextPoint(91, axis)).toBe(91)
        expect(getNextPoint(100, axis)).toBe(100)
        expect(getNextPoint(110, axis)).toBe(110)
    })

    test('only points', () => {
        const axis = { min: 0, max: 100, points: [10, 43, 78] }
        expect(getNextPoint(-1, axis)).toBe(10)
        expect(getNextPoint(0, axis)).toBe(10)
        expect(getNextPoint(1, axis)).toBe(10)
        expect(getNextPoint(10, axis)).toBe(43)
        expect(getNextPoint(43, axis)).toBe(78)
        expect(getNextPoint(77, axis)).toBe(78)
        expect(getNextPoint(78, axis)).toBe(78)
        expect(getNextPoint(90, axis)).toBe(90)
        expect(getNextPoint(100, axis)).toBe(100)
        expect(getNextPoint(110, axis)).toBe(110)
    })

    test('step, points', () => {
        const axis = { min: 0, max: 100, step: 30, points: [10, 43, 78, 91, 92] }
        expect(getNextPoint(-1, axis)).toBe(0)
        expect(getNextPoint(0, axis)).toBe(10)
        expect(getNextPoint(1, axis)).toBe(10)
        expect(getNextPoint(10, axis)).toBe(30)
        expect(getNextPoint(11, axis)).toBe(30)
        expect(getNextPoint(30, axis)).toBe(43)
        expect(getNextPoint(43, axis)).toBe(60)
        expect(getNextPoint(90, axis)).toBe(91)
        expect(getNextPoint(91, axis)).toBe(92)
        expect(getNextPoint(92, axis)).toBe(92)
        expect(getNextPoint(100, axis)).toBe(100)
        expect(getNextPoint(110, axis)).toBe(110)
    })
})

describe('getPrevPoint', () => {
    test('no step, no points', () => {
        const axis = { min: -1, max: 1 }
        expect(getPrevPoint(2, axis)).toBe(1)
        expect(getPrevPoint(1, axis)).toBe(0.98)
        expect(getPrevPoint(0.995, axis)).toBe(0.975)
        expect(getPrevPoint(0.98, axis)).toBe(0.96)
        expect(getPrevPoint(0, axis)).toBe(-0.02)
        expect(getPrevPoint(-0.005, axis)).toBe(-0.025)
        expect(getPrevPoint(-0.995, axis)).toBe(-1)
        expect(getPrevPoint(-1, axis)).toBe(-1)
        expect(getPrevPoint(-1.2, axis)).toBe(-1.2)
    })

    test('only step', () => {
        const axis = { min: -100, max: 100, step: 30 }
        expect(getPrevPoint(101, axis)).toBe(100)
        expect(getPrevPoint(100, axis)).toBe(80)
        expect(getPrevPoint(90, axis)).toBe(80)
        expect(getPrevPoint(80, axis)).toBe(50)
        expect(getPrevPoint(0, axis)).toBe(-10)
        expect(getPrevPoint(-5, axis)).toBe(-10)
        expect(getPrevPoint(-10, axis)).toBe(-40)
        expect(getPrevPoint(-70, axis)).toBe(-100)
        expect(getPrevPoint(-85, axis)).toBe(-100)
        expect(getPrevPoint(-100, axis)).toBe(-100)
        expect(getPrevPoint(-120, axis)).toBe(-120)
    })

    test('only points', () => {
        const axis = { min: -100, max: 100, points: [-78, -43, -10, 10, 43, 78] }
        expect(getPrevPoint(101, axis)).toBe(78)
        expect(getPrevPoint(100, axis)).toBe(78)
        expect(getPrevPoint(99, axis)).toBe(78)
        expect(getPrevPoint(78, axis)).toBe(43)
        expect(getPrevPoint(43, axis)).toBe(10)
        expect(getPrevPoint(0, axis)).toBe(-10)
        expect(getPrevPoint(-1, axis)).toBe(-10)
        expect(getPrevPoint(-77, axis)).toBe(-78)
        expect(getPrevPoint(-78, axis)).toBe(-78)
        expect(getPrevPoint(-100, axis)).toBe(-100)
        expect(getPrevPoint(-101, axis)).toBe(-101)
    })

    test('step, points', () => {
        const axis = { min: -100, max: 100, step: 30, points: [-78, -43, -10, 10, 43, 78] }
        expect(getPrevPoint(101, axis)).toBe(100)
        expect(getPrevPoint(100, axis)).toBe(80)
        expect(getPrevPoint(99, axis)).toBe(80)
        expect(getPrevPoint(80, axis)).toBe(78)
        expect(getPrevPoint(78, axis)).toBe(50)
        expect(getPrevPoint(0, axis)).toBe(-10)
        expect(getPrevPoint(-78, axis)).toBe(-100)
        expect(getPrevPoint(-99, axis)).toBe(-100)
        expect(getPrevPoint(-100, axis)).toBe(-100)
        expect(getPrevPoint(-101, axis)).toBe(-101)
    })
})
