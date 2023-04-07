class StatusesBitmap {
  private _width: bigint;
  private _height: bigint;
  private bitsPerStatus: bigint;
  private maxStatus: bigint;
  private statuses: Array<string>;
  private itemsPerRow: bigint;
  private rows: { [rowIndex: string]: bigint };

  constructor(width: bigint, bitsPerStatus: bigint, statuses: Array<string>) {
    if (width % bitsPerStatus !== BigInt(0)) {
      throw new Error("width must be divisible by bitsPerStatus");
    }

    this.maxStatus = bitsPerStatus ** BigInt(2) - BigInt(1);

    if (BigInt(statuses.length) - BigInt(1) > this.maxStatus) {
      throw new Error(`too many statuses for ${bitsPerStatus} bits`);
    }

    this._width = width;
    this._height = BigInt(0);
    this.bitsPerStatus = bitsPerStatus;
    this.statuses = statuses;
    this.itemsPerRow = width / this.bitsPerStatus;
    this.rows = {};
  }

  public width() {
    return this._width;
  }

  public height() {
    return this._height;
  }

  public setStatus(index: bigint, status: string) {
    const value = BigInt(this.statuses.indexOf(status));
    if (value < BigInt(0)) {
      throw new Error("invalid status");
    }

    const rowIndex = index / this.itemsPerRow;
    const colIndex = (index % this.itemsPerRow) * this.bitsPerStatus;

    const currentRowValue = this.rows[rowIndex.toString()] ?? BigInt(0);

    const mask: bigint = this.maxStatus << colIndex;
    const cleared: bigint = currentRowValue & ~mask;
    const newRowValue = cleared | (value << colIndex);

    this.rows[rowIndex.toString()] = newRowValue;

    const height = rowIndex + BigInt(1);
    if (height > this._height) {
      this._height = height;
    }
  }

  public getStatusNumber(index: bigint): bigint {
    const rowIndex = index / this.itemsPerRow;
    const colIndex = (index % this.itemsPerRow) * this.bitsPerStatus;
    const row = this.rows[rowIndex.toString()] ?? BigInt(0);
    const value = (row >> colIndex) & this.maxStatus;

    return value;
  }

  public getStatus(index: bigint): string | undefined {
    const value = this.getStatusNumber(index);
    return this.statuses[Number(value)];
  }

  public inspectRow(rowIndex: bigint): string {
    const row = this.rows[rowIndex.toString()] ?? BigInt(0);
    const buf: Array<string> = [];

    for (let j = BigInt(0); j < this.itemsPerRow; j++) {
      const value = (row >> (j * this.bitsPerStatus)) & this.maxStatus;
      buf.push(value.toString(2).padStart(Number(this.bitsPerStatus), "0"));
    }

    return buf.reverse().join(" ");
  }

  public inspect(): string {
    let buf: Array<string> = [];

    for (let i = BigInt(0); i < this._height; i++) {
      buf.push(this.inspectRow(i));
    }

    return buf.join("\n");
  }

  public getRow(rowIndex: bigint): bigint {
    return this.rows[rowIndex.toString()] ?? BigInt(0);
  }

  public setRow(rowIndex: bigint, value: bigint) {
    this.rows[rowIndex.toString()] = value;

    const height = rowIndex + BigInt(1);
    if (height > this._height) {
      this._height = height;
    }
  }

  public getRows() {
    return this.rows;
  }
}

export default StatusesBitmap;
