'use client';

import LineGraph from '@/components/LineChart';
import { ParentSize } from '@visx/responsive';

export default function LinesPage() {
  return (
    <ParentSize>
      {({ width, height }) => <LineGraph width={width} height={height} />}
    </ParentSize>
  );
}
