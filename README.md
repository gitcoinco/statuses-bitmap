# Statuses Bitmap

The `StatusesBitmap` class is a Typescript/Javascript implementation of a bitmap (or bit array) used to represent a set of statuses.

A bitmap is a data structure that uses a sequence of bits to represent the state of some set of objects.
In the case of the `StatusesBitmap`, each bit (or group of bits) represents a single status in a given set of statuses.
The set of statuses can be of any size, and each status can be represented by a variable number of bits.

The `StatusesBitmap` class provides methods to set and get the status of a given index, get the status as a string,
set and get the row of a given index, and inspect the contents of the bitmap.

When creating a `StatusesBitmap`, the width of the bitmap must be specified as a bigint,
and the number of bits used to represent each status must also be specified as a bigint.
The set of statuses is provided as an array of strings.

## Installation

```
npm install git+https://github.com/gitcoinco/statuses-bitmap.git
```

## Usage

```typescript
import StatusesBitmap from 'statuses-bitmap';

enum Status {
  Pending = 0,
  Accepted,
  Rejected,
  Canceled,
}

const bitmap = new StatusesBitmap(BigInt(8), BigInt(2));

bitmap.setStatus(BigInt(0), Status.Pending); // sets the status of the 1st item to "pending"
bitmap.setStatus(BigInt(1), Status.Accepted); // sets the status of the 2nd item to "accepted"
bitmap.setStatus(BigInt(2), Status.Rejected); // sets the status of the 3rd item to "rejected"
bitmap.setStatus(BigInt(3), Status.Canceled); // sets the status of the 4th item to "canceled"
bitmap.setStatus(BigInt(4), Status.Accepted); // sets the status of the 5th item to "accepted"
bitmap.setStatus(BigInt(5), Status.Rejected); // sets the status of the 6th item to "rejected"

bitmap.setStatus(BigInt(9), Status.Accepted); // sets the status of the 10th item to "accepted"
bitmap.setStatus(BigInt(15), Status.Rejected); // sets the status of the 16th item to "rejected"

console.log(bitmap.inspect());
```

This will output:

```
11 10 01 00
00 00 10 01
00 00 01 00
10 00 00 00
```
