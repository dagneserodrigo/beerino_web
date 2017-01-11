export class Beer {
    constructor(
        public beerId: number,
        public name: string,
        public description: string,
        public recipe: string,
        public visible: any,
        public userId: number
    ) { }
}