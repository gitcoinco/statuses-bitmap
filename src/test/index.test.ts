import StatusesBitmap from "../index.js";

describe("StatusesBitmap", () => {
  let b: StatusesBitmap;
  beforeEach(() => {
    b = new StatusesBitmap(BigInt(8), BigInt(2), [
      "pending",
      "accepted",
      "rejected",
      "canceled",
    ]);

    b.setStatus(BigInt(0), "pending");
    b.setStatus(BigInt(1), "accepted");
    b.setStatus(BigInt(2), "rejected");
    b.setStatus(BigInt(3), "canceled");

    b.setStatus(BigInt(7), "canceled");
    b.setStatus(BigInt(10), "rejected");
    b.setStatus(BigInt(13), "rejected");
    b.setStatus(BigInt(16), "rejected");

    b.setStatus(BigInt(20), "canceled");
    b.setStatus(BigInt(21), "rejected");
    b.setStatus(BigInt(22), "accepted");
    b.setStatus(BigInt(23), "pending");
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

  test("getStatusNumber", () => {
    expect(b.getStatusNumber(BigInt(0))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(1))).toEqual(BigInt(1));
    expect(b.getStatusNumber(BigInt(2))).toEqual(BigInt(2));
    expect(b.getStatusNumber(BigInt(3))).toEqual(BigInt(3));

    expect(b.getStatusNumber(BigInt(4))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(5))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(6))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(7))).toEqual(BigInt(3));

    expect(b.getStatusNumber(BigInt(8))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(9))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(10))).toEqual(BigInt(2));
    expect(b.getStatusNumber(BigInt(11))).toEqual(BigInt(0));

    expect(b.getStatusNumber(BigInt(12))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(13))).toEqual(BigInt(2));
    expect(b.getStatusNumber(BigInt(14))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(15))).toEqual(BigInt(0));

    expect(b.getStatusNumber(BigInt(16))).toEqual(BigInt(2));
    expect(b.getStatusNumber(BigInt(17))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(18))).toEqual(BigInt(0));
    expect(b.getStatusNumber(BigInt(19))).toEqual(BigInt(0));

    expect(b.getStatusNumber(BigInt(20))).toEqual(BigInt(3));
    expect(b.getStatusNumber(BigInt(21))).toEqual(BigInt(2));
    expect(b.getStatusNumber(BigInt(22))).toEqual(BigInt(1));
    expect(b.getStatusNumber(BigInt(23))).toEqual(BigInt(0));
  });

  test("getStatus", () => {
    expect(b.getStatus(BigInt(0))).toEqual("pending");
    expect(b.getStatus(BigInt(1))).toEqual("accepted");
    expect(b.getStatus(BigInt(2))).toEqual("rejected");
    expect(b.getStatus(BigInt(3))).toEqual("canceled");

    expect(b.getStatus(BigInt(4))).toEqual("pending");
    expect(b.getStatus(BigInt(5))).toEqual("pending");
    expect(b.getStatus(BigInt(6))).toEqual("pending");
    expect(b.getStatus(BigInt(7))).toEqual("canceled");

    expect(b.getStatus(BigInt(8))).toEqual("pending");
    expect(b.getStatus(BigInt(9))).toEqual("pending");
    expect(b.getStatus(BigInt(10))).toEqual("rejected");
    expect(b.getStatus(BigInt(11))).toEqual("pending");

    expect(b.getStatus(BigInt(12))).toEqual("pending");
    expect(b.getStatus(BigInt(13))).toEqual("rejected");
    expect(b.getStatus(BigInt(14))).toEqual("pending");
    expect(b.getStatus(BigInt(15))).toEqual("pending");

    expect(b.getStatus(BigInt(16))).toEqual("rejected");
    expect(b.getStatus(BigInt(17))).toEqual("pending");
    expect(b.getStatus(BigInt(18))).toEqual("pending");
    expect(b.getStatus(BigInt(19))).toEqual("pending");

    expect(b.getStatus(BigInt(20))).toEqual("canceled");
    expect(b.getStatus(BigInt(21))).toEqual("rejected");
    expect(b.getStatus(BigInt(22))).toEqual("accepted");
    expect(b.getStatus(BigInt(23))).toEqual("pending");
  });

  test("size", () => {
    expect(b.width()).toEqual(BigInt(8));
    expect(b.height()).toEqual(BigInt(6));

    b.setRow(BigInt(20), BigInt(1));

    expect(b.height()).toEqual(BigInt(21));
  });

  test("inspectRow", () => {
    expect(b.inspectRow(BigInt(0))).toEqual("11 10 01 00");
    expect(b.inspectRow(BigInt(1))).toEqual("11 00 00 00");
    expect(b.inspectRow(BigInt(2))).toEqual("00 10 00 00");
    expect(b.inspectRow(BigInt(3))).toEqual("00 00 10 00");
    expect(b.inspectRow(BigInt(4))).toEqual("00 00 00 10");
    expect(b.inspectRow(BigInt(5))).toEqual("00 01 10 11");

    const statuses = ["pending", "accepted", "rejected", "canceled"];
    const bitmap = new StatusesBitmap(BigInt(8), BigInt(2), statuses);

    bitmap.setStatus(BigInt(0), "pending"); // sets the status of the 1st item to "pending"
    bitmap.setStatus(BigInt(1), "accepted"); // sets the status of the 2nd item to "accepted"
    bitmap.setStatus(BigInt(2), "rejected"); // sets the status of the 3rd item to "rejected"
    bitmap.setStatus(BigInt(3), "canceled"); // sets the status of the 4th item to "canceled"
    bitmap.setStatus(BigInt(4), "accepted"); // sets the status of the 5th item to "accepted"
    bitmap.setStatus(BigInt(5), "rejected"); // sets the status of the 6th item to "rejected"

    bitmap.setStatus(BigInt(9), "accepted"); // sets the status of the 10th item to "accepted"
    bitmap.setStatus(BigInt(15), "rejected"); // sets the status of the 16th item to "rejected"

    console.log(bitmap.inspect());
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
