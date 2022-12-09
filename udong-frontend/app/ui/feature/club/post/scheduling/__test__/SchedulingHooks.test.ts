import { SchedulingPostType } from '../../../../../../domain/model/SchedulingPostType'
import { new2dArray } from '../../../../../../utility/functions'
import { getInc } from '../SchedulingHooks'

describe('SchedulingHooks.ts', () => {
    it('test getInc', async () => {
        const inc = getInc({
            type: SchedulingPostType.DAYS,
            startTime: 12,
            endTime: 18,
            confirmedTime: null,
            closed: false,
            availableTime: [
                {
                    id: 1,
                    user: { id: 1, name: 'user1', email: 'email1', imageUrl: '', timeTable: new2dArray(7, 48, false) },
                    time: [
                        [true, true, true, true, true, true],
                        [true, true, false, false, true, false],
                        [true, true, false, false, true, false],
                        [false, false, false, false, false, false],
                    ],
                },
            ],
        }, new2dArray(4, 6, true))
        expect(inc.length).toEqual(1)
        expect(inc[0]).toEqual(1)
    })
})
