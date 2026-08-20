
export default class Drawing{
  private pixels: number[][];
  private score: number;
  public readonly rows: number;
  public readonly cols: number;  
  
  constructor(rows: number, cols: number){
    this.score = -1;
    this.rows = rows;
    this.cols = cols;

    let randomColor = Math.round(Math.random() * 0xffffff);
    this.pixels = Array.from({ length: rows }, () =>
      Array(cols).fill(randomColor)
    );
  }

  public CalculateScore(original: Drawing):number {
    let distance = 0;

    this.pixels.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        distance += Math.abs(value - original.get(rowIndex, colIndex));
      });
    });

    this.score = distance;
    return distance;
  }

  public static Crosover(a: Drawing, b:Drawing):Drawing{

    function getBit(num: number, position: number): boolean {
      return (num & (1 << position)) !== 0;
    }
    function setBit(num: number, position: number): number {
      return num | (1 << position);
    }

    const newDrawing = new Drawing(a.rows, a.cols);
    for (let r = 0; r < a.rows; r++){
      for (let c = 0; c < a.cols; c++){
        let value = 0x000000;
        const hexA = a.get(r, c);
        const hexB = b.get(r, c);

        for (let i = 0; i < 24; i++)
        {
          const newBit = Math.random() < 0.5 ? getBit(hexA, i) : getBit(hexB, i);
          value = setBit(newBit ? 1 : 0, i);
        }
        newDrawing.set(r, c, value);
      }
    }
    return newDrawing;
  }

  public Reproduce(mutation: number): Drawing {
    
    function toggleBit(num: number, position: number): number {
    return num ^ (1 << position);
    }
    
    const newDrawing = new Drawing(this.rows, this.cols);

    this.pixels.forEach((row, rowIndex) => {
      row.forEach((value, colIndex) => {
        let val = value;
        for (let i = 0; i < 24; i++)
        {
            if (Math.random() > mutation) continue;
            val = toggleBit(val, i);
        }
        newDrawing.set(rowIndex, colIndex, value);
      });
    });

    return newDrawing;
  }

  public set(row: number, col: number, value: number): void {
    if (!this.pixels) return;
    if (!this.pixels[row]) return;

    if (this.isValidCoordinate(row, col)) {
      this.pixels[row][col] = value;
    } else {
      throw new Error("Index out of bounds");
    }
  }

  public get(row: number, col: number): number {
    const DEFAULT_ERROR_RETURN = 0;
    if (!this.pixels) return DEFAULT_ERROR_RETURN;
    if (!this.pixels[row]) return DEFAULT_ERROR_RETURN;

    if (this.isValidCoordinate(row, col)) {
      return this.pixels[row][col] ? this.pixels[row][col] : DEFAULT_ERROR_RETURN;
    }
    throw new Error("Index out of bounds");
  }

  private isValidCoordinate(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
  }

  public getScore():number{return this.score; }
}




