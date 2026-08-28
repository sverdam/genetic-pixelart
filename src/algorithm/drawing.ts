export default class Drawing {
    private pixels: number[][];
    private score: number;

    public readonly rows: number;
    public readonly cols: number;

    constructor(rows: number, cols: number) {
        this.score = -1;

        this.rows = rows;
        this.cols = cols;

        //const randomColor = Math.round(Math.random() * 0xffffff);

        this.pixels = Array.from(
            { length: rows },
            () => {
                
            const randomColor =
                Math.round(Math.random() * 0xffffff);
                return Array(cols).fill(randomColor)
            }
        );

    }

    public CalculateScore(original: Drawing): number {
        if (this.score >= 0) {
            return this.score;
        }

        let distance = 0;

        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const value = this.pixels[row]![col]!;
                const originalValue =
                    original.pixels[row]![col]!;

                    /*
                * distance += Math.abs(originalValue - value)
                * continue;
                 */
            
                const difference =
                    value ^ originalValue;

                for (
                    let bit = difference;
                    bit !== 0;
                    bit &= bit - 1
                ) {
                    const position =
                        31 - Math.clz32(bit);
                    
                    const weight = 2;
                    const baseValue = 1
                    distance += baseValue + (position % 8) * weight;
                }
            }
        }

        this.score = distance;

        return distance;
    }

    public static Crossover(
        a: Drawing,
        b: Drawing
    ): Drawing {

        const newDrawing =
            new Drawing(a.rows, a.cols);

        for (let row = 0; row < a.rows; row++) {
            for (let col = 0; col < a.cols; col++) {
                const valueA =
                    a.pixels[row]![col]!;

                const valueB =
                    b.pixels[row]![col]!;

                let value = 0;

                for (let bit = 0; bit < 24; bit++) {
                    const mask = 1 << bit;

                    if (Math.random() < 0.5) {
                        value |= valueA & mask;
                    } else {
                        value |= valueB & mask;
                    }
                }

                newDrawing.pixels[row]![col] = value;
            }
        }

        return newDrawing;
    }

    public Reproduce(mutation: number): Drawing {
    const newDrawing =
        new Drawing(this.rows, this.cols);

    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols; col++) {

            let value =
                this.pixels[row]![col]!;

            for (let bit = 0; bit < 24; bit++) {
                if (Math.random() < mutation) {
                    value ^= 1 << bit;
                }
            }

            newDrawing.pixels[row]![col] = value;
        }
    }
    if (mutation === 0) {
        newDrawing.score = this.score;
    }

    return newDrawing;
}

    public set(
        row: number,
        col: number,
        value: number
    ): void {
        if (!this.isValidCoordinate(row, col)) {
            throw new Error("Index out of bounds");
        }

        this.pixels[row]![col] = value & 0xffffff;
        this.score = -1;
    }

    public get(
        row: number,
        col: number
    ): number {
        if (!this.isValidCoordinate(row, col)) {
            throw new Error("Index out of bounds");
        }

        return this.pixels[row]![col]!;
    }

    public getPixelArray(): readonly number[][] {
        return this.pixels;
    }

    public getScore(): number {
        return this.score;
    }

    private isValidCoordinate(
        row: number,
        col: number
    ): boolean {
        return (
            row >= 0 &&
            row < this.rows &&
            col >= 0 &&
            col < this.cols
        );
    }
}