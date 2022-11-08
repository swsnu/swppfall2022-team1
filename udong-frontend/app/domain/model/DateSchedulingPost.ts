import { SchedulingPost } from './SchedulingPost'

export interface DateSchedulingPost extends SchedulingPost {
    // TODO: 백엔드에는 jsonField로 되어있는데 물어보기..
    dates: Array<number>
}
