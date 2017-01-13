export class Beerino {
    constructor(
        public beerinoId: string,
        public name: string,
        public description: string,
        public userId: number,
        public currentBeerId: number,
        public currentTaskId: number,
        public currentTemperature: number
    ) {}
}
