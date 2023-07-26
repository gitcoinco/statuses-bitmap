import StatusesBitmap from "../index.js";

enum Status {
  Pending = 0,
  Accepted,
  Rejected,
  Canceled,
}

enum Status1Bit {
  False = 0,
  True,
}

describe("StatusesBitmap", () => {
  let b: StatusesBitmap;
  beforeEach(() => {
    b = new StatusesBitmap(BigInt(8), BigInt(2));

    b.setStatus(BigInt(0), Status.Pending);
    b.setStatus(BigInt(1), Status.Accepted);
    b.setStatus(BigInt(2), Status.Rejected);
    b.setStatus(BigInt(3), Status.Canceled);

    b.setStatus(BigInt(7), Status.Canceled);
    b.setStatus(BigInt(10), Status.Rejected);
    b.setStatus(BigInt(13), Status.Rejected);
    b.setStatus(BigInt(16), Status.Rejected);

    b.setStatus(BigInt(20), Status.Canceled);
    b.setStatus(BigInt(21), Status.Rejected);
    b.setStatus(BigInt(22), Status.Accepted);
    b.setStatus(BigInt(23), Status.Pending);
  });

  test("setRow with bad index", () => {
    expect(() => b.setStatus(BigInt(-1), 1)).toThrow("invalid index");
  });

  test("setRow with bad status", () => {
    expect(() => b.setStatus(BigInt(0), -1)).toThrow("invalid status");
    expect(() => b.setStatus(BigInt(0), 9999)).toThrow("invalid status");
  });

  test("getRow", () => {
    expect(b.getRow(BigInt(0))).toEqual(BigInt(228));
    expect(b.getRow(BigInt(1))).toEqual(BigInt(192));
    expect(b.getRow(BigInt(2))).toEqual(BigInt(32));
    expect(b.getRow(BigInt(3))).toEqual(BigInt(8));
    expect(b.getRow(BigInt(4))).toEqual(BigInt(2));
    expect(b.getRow(BigInt(5))).toEqual(BigInt(27));
  });

  test("setRow", () => {
    expect(b.getRow(BigInt(0))).toEqual(BigInt(228));
    expect(b.getRow(BigInt(1))).toEqual(BigInt(192));

    b.setRow(BigInt(0), BigInt(10));
    b.setRow(BigInt(1), BigInt(20));

    expect(b.getRow(BigInt(0))).toEqual(BigInt(10));
    expect(b.getRow(BigInt(1))).toEqual(BigInt(20));
  });

  test("getStatus", () => {
    expect(b.getStatus(BigInt(0))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(1))).toEqual(Status.Accepted);
    expect(b.getStatus(BigInt(2))).toEqual(Status.Rejected);
    expect(b.getStatus(BigInt(3))).toEqual(Status.Canceled);

    expect(b.getStatus(BigInt(4))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(5))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(6))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(7))).toEqual(Status.Canceled);

    expect(b.getStatus(BigInt(8))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(9))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(10))).toEqual(Status.Rejected);
    expect(b.getStatus(BigInt(11))).toEqual(Status.Pending);

    expect(b.getStatus(BigInt(12))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(13))).toEqual(Status.Rejected);
    expect(b.getStatus(BigInt(14))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(15))).toEqual(Status.Pending);

    expect(b.getStatus(BigInt(16))).toEqual(Status.Rejected);
    expect(b.getStatus(BigInt(17))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(18))).toEqual(Status.Pending);
    expect(b.getStatus(BigInt(19))).toEqual(Status.Pending);

    expect(b.getStatus(BigInt(20))).toEqual(Status.Canceled);
    expect(b.getStatus(BigInt(21))).toEqual(Status.Rejected);
    expect(b.getStatus(BigInt(22))).toEqual(Status.Accepted);
    expect(b.getStatus(BigInt(23))).toEqual(Status.Pending);
  });

  test("size", () => {
    expect(b.width).toEqual(BigInt(8));
    expect(b.height).toEqual(BigInt(6));

    b.setRow(BigInt(20), BigInt(1));

    expect(b.height).toEqual(BigInt(21));
  });

  test("itemsPerRow", () => {
    expect(b.itemsPerRow).toEqual(BigInt(4));
  });

  test("inspectRow", () => {
    expect(b.inspectRow(BigInt(0))).toEqual("11 10 01 00");
    expect(b.inspectRow(BigInt(1))).toEqual("11 00 00 00");
    expect(b.inspectRow(BigInt(2))).toEqual("00 10 00 00");
    expect(b.inspectRow(BigInt(3))).toEqual("00 00 10 00");
    expect(b.inspectRow(BigInt(4))).toEqual("00 00 00 10");
    expect(b.inspectRow(BigInt(5))).toEqual("00 01 10 11");
  });

  test("inspect", () => {
    const expected = `
11 10 01 00
11 00 00 00
00 10 00 00
00 00 10 00
00 00 00 10
00 01 10 11`;

    expect("\n" + b.inspect()).toEqual(expected);
  });
});

describe("StatusesBitmap 1bit", () => {
  let b: StatusesBitmap;
  beforeEach(() => {
    b = new StatusesBitmap(BigInt(2), BigInt(1));

    b.setStatus(BigInt(0), Status1Bit.False);
    b.setStatus(BigInt(1), Status1Bit.True);

    b.setStatus(BigInt(2), Status1Bit.True);
    b.setStatus(BigInt(3), Status1Bit.False);
  });

  test("setRow with bad index", () => {
    expect(() => b.setStatus(BigInt(-1), 1)).toThrow("invalid index");
  });

  test("setRow with bad status", () => {
    expect(() => b.setStatus(BigInt(0), -1)).toThrow("invalid status");
    expect(() => b.setStatus(BigInt(0), 9999)).toThrow("invalid status");
  });

  test("getRow", () => {
    expect(b.getRow(BigInt(0))).toEqual(BigInt(2));
    expect(b.getRow(BigInt(1))).toEqual(BigInt(1));
  });

  test("setRow", () => {
    expect(b.getRow(BigInt(0))).toEqual(BigInt(2));
    expect(b.getRow(BigInt(1))).toEqual(BigInt(1));

    b.setRow(BigInt(0), BigInt(1));
    b.setRow(BigInt(1), BigInt(2));

    expect(b.getRow(BigInt(0))).toEqual(BigInt(1));
    expect(b.getRow(BigInt(1))).toEqual(BigInt(2));
  });

  test("getStatus", () => {
    expect(b.getStatus(BigInt(0))).toEqual(Status1Bit.False);
    expect(b.getStatus(BigInt(1))).toEqual(Status1Bit.True);
    expect(b.getStatus(BigInt(2))).toEqual(Status1Bit.True);
    expect(b.getStatus(BigInt(3))).toEqual(Status1Bit.False);
  });

  test("size", () => {
    expect(b.width).toEqual(BigInt(2));
    expect(b.height).toEqual(BigInt(2));

    b.setRow(BigInt(20), BigInt(1));

    expect(b.height).toEqual(BigInt(21));
  });

  test("itemsPerRow", () => {
    expect(b.itemsPerRow).toEqual(BigInt(2));
  });

  test("inspectRow", () => {
    expect(b.inspectRow(BigInt(0))).toEqual("1 0");
    expect(b.inspectRow(BigInt(1))).toEqual("0 1");
  });

  test("inspect", () => {
    const expected = `
1 0
0 1`;

    expect("\n" + b.inspect()).toEqual(expected);
  });
});
