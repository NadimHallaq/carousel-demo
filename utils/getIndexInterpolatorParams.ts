import { getRangeForLength } from "./getRangeForLength";

type GetIndexInterpolatorParams = {
  length: number;
  multiplier: number;
  index: number;
  getOutputRange: (params: { activeIndex: number; index: number }) => number;
};

export function getIndexInterpolatorParams({
  index,
  length,
  multiplier,
  getOutputRange,
}: GetIndexInterpolatorParams) {
  const indexRange = getRangeForLength(length);
  const inputRange = indexRange.map((item) => (index + item) * multiplier);
  const tempOutputRange = indexRange.map((item) => (item === 0 ? 1 : 0));
  const activeIndex = tempOutputRange.findIndex((val) => val === 1);
  const outputRange = tempOutputRange.map((val, index) =>
    getOutputRange({ activeIndex, index })
  );
  return {
    inputRange,
    outputRange,
    activeIndex,
  };
}
