export type ChartProps<T> = {
  width: number;
  height: number;
  data: T[];
  getX: (d: T) => unknown;
  getY: (d: T) => unknown;
};
