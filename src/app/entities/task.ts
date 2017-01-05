export class Task {
    constructor(
        public taskId: number,
        public temperature: number,
        public beerId: number,
        public userId: number
    ) {}
}