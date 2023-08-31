'use client';

import BarChart from '@/components/BarChart';
import { ParentSize } from '@visx/responsive';

export default function LinesPage() {
  return (
    <ParentSize>
      {({ width, height }) => <BarChart width={width} height={height} />}
    </ParentSize>
  );
}
