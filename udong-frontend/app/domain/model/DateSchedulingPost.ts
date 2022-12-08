import { SchedulingPost } from './SchedulingPost'

export interface DateSchedulingPost extends SchedulingPost {
    dates: Array<Date>
}
