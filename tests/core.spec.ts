import { computePages, getOffset, PagePosition, Position } from '../src/core';

describe('computePages', () => {
  const pp = (page: number, position: Position): PagePosition => {
    return { page, position };
  };

  const ptn = (offset: number, expected: PagePosition[]) => {
    return [offset, expected];
  };

  const _test = (
    limit: number,
    total: number,
    innerButtonCount: number,
    outerButtonCount: number
  ) => (patterns: (number | PagePosition[])[][]) => {
    describe(`limit: ${limit}, total: ${total}, innerButtonCount: ${innerButtonCount}, outerButtonCount: ${outerButtonCount}`, () => {
      describe.each(patterns)(
        'offset: %i',
        (offset: number | PagePosition[], expected: number | PagePosition[]) => {
          it(`=> ${JSON.stringify(expected)}`, () => {
            expect(
              computePages(limit, offset as number, total, innerButtonCount, outerButtonCount)
            ).toEqual(expected as PagePosition[]);
          });
        }
      );
    });
  };

  _test(0, -1, -1, 0)([
    ptn(-1, [pp(0, Position.LowEnd), pp(1, Position.Current), pp(0, Position.HighEnd)])
  ]);

  _test(10, 10, 1, 1)([
    ptn(0, [pp(0, Position.LowEnd), pp(1, Position.Current), pp(0, Position.HighEnd)])
  ]);

  _test(10, 11, 1, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 70, 1, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(7, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(7, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(7, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 80, 1, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 90, 1, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 10, 1, 2)([
    ptn(0, [pp(0, Position.LowEnd), pp(1, Position.Current), pp(0, Position.HighEnd)])
  ]);

  _test(10, 11, 1, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 90, 1, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 100, 1, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(10, Position.Standard),
      pp(10, Position.HighEnd)
    ]),
    ptn(90, [
      pp(9, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 110, 1, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(10, Position.HighEnd)
    ]),
    ptn(90, [
      pp(9, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Current),
      pp(11, Position.Standard),
      pp(11, Position.HighEnd)
    ]),
    ptn(100, [
      pp(10, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 10, 2, 1)([
    ptn(0, [pp(0, Position.LowEnd), pp(1, Position.Current), pp(0, Position.HighEnd)])
  ]);

  _test(10, 11, 2, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 90, 2, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(9, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 100, 2, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(10, Position.Standard),
      pp(10, Position.HighEnd)
    ]),
    ptn(90, [
      pp(9, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 110, 2, 1)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(10, Position.HighEnd)
    ]),
    ptn(90, [
      pp(9, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Current),
      pp(11, Position.Standard),
      pp(11, Position.HighEnd)
    ]),
    ptn(100, [
      pp(10, Position.LowEnd),
      pp(1, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 10, 2, 2)([
    ptn(0, [pp(0, Position.LowEnd), pp(1, Position.Current), pp(0, Position.HighEnd)])
  ]);

  _test(10, 11, 2, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 110, 2, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(10, Position.HighEnd)
    ]),
    ptn(90, [
      pp(9, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Current),
      pp(11, Position.Standard),
      pp(11, Position.HighEnd)
    ]),
    ptn(100, [
      pp(10, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 120, 2, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(10, Position.HighEnd)
    ]),
    ptn(90, [
      pp(9, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Current),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(11, Position.HighEnd)
    ]),
    ptn(100, [
      pp(10, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Current),
      pp(12, Position.Standard),
      pp(12, Position.HighEnd)
    ]),
    ptn(110, [
      pp(11, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);

  _test(10, 130, 2, 2)([
    ptn(0, [
      pp(0, Position.LowEnd),
      pp(1, Position.Current),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(2, Position.HighEnd)
    ]),
    ptn(10, [
      pp(1, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Current),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(3, Position.HighEnd)
    ]),
    ptn(20, [
      pp(2, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Current),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(4, Position.HighEnd)
    ]),
    ptn(30, [
      pp(3, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Current),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(5, Position.HighEnd)
    ]),
    ptn(40, [
      pp(4, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Current),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(6, Position.HighEnd)
    ]),
    ptn(50, [
      pp(5, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(3, Position.Standard),
      pp(4, Position.Standard),
      pp(5, Position.Standard),
      pp(6, Position.Current),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(7, Position.HighEnd)
    ]),
    ptn(60, [
      pp(6, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(5, Position.Standard),
      pp(6, Position.Standard),
      pp(7, Position.Current),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(0, Position.HighEllipsis),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(8, Position.HighEnd)
    ]),
    ptn(70, [
      pp(7, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(6, Position.Standard),
      pp(7, Position.Standard),
      pp(8, Position.Current),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(9, Position.HighEnd)
    ]),
    ptn(80, [
      pp(8, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(7, Position.Standard),
      pp(8, Position.Standard),
      pp(9, Position.Current),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(10, Position.HighEnd)
    ]),
    ptn(90, [
      pp(9, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(8, Position.Standard),
      pp(9, Position.Standard),
      pp(10, Position.Current),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(11, Position.HighEnd)
    ]),
    ptn(100, [
      pp(10, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Current),
      pp(12, Position.Standard),
      pp(13, Position.Standard),
      pp(12, Position.HighEnd)
    ]),
    ptn(110, [
      pp(11, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Current),
      pp(13, Position.Standard),
      pp(13, Position.HighEnd)
    ]),
    ptn(120, [
      pp(12, Position.LowEnd),
      pp(1, Position.Standard),
      pp(2, Position.Standard),
      pp(0, Position.LowEllipsis),
      pp(9, Position.Standard),
      pp(10, Position.Standard),
      pp(11, Position.Standard),
      pp(12, Position.Standard),
      pp(13, Position.Current),
      pp(0, Position.HighEnd)
    ])
  ]);
});

describe('getOffset', () => {
  const patterns = [[0, 10, 0], [1, 10, 0], [2, 10, 10], [3, 10, 20]];
  describe.each(patterns)('page: %i, limit: %i', (page, limit, expected) => {
    it(`=> ${expected}`, () => {
      expect(getOffset(page, limit)).toBe(expected);
    });
  });
});
