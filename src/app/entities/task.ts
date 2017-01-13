export class Task {
    constructor(
        public taskId: number,
        public time: number,
        public temperature: number,
        public order: number,
        public beerId: number
    ) {}
}
