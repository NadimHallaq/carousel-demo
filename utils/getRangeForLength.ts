import range from 'lodash/range';

export function getRangeForLength(length: number) {
  const isEven = length % 2 === 0;
  const midDot = isEven ? Math.floor(length / 2) : Math.ceil(length / 2);
  return range(-midDot, midDot + 1);
}
