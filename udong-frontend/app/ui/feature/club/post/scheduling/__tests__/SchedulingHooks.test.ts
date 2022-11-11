import { getInc } from '../SchedulingHooks'

describe('SchedulingHooks.ts', () => {
    it('test getInc', async () => {
        const inc = getInc({ availableTime: [{ user: { id: 1 }, time: [[true]] }] }, [[true]])
        expect(inc.length).toEqual(1)
        expect(inc[0]).toEqual(1)
    })
})
