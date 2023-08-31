'use client';

import BarChart from '@/components/BarChart';
import { ParentSize } from '@visx/responsive';

export default function LinesPage() {
  return <ParentSize>{(props) => <BarChart {...props} />}</ParentSize>;
}
