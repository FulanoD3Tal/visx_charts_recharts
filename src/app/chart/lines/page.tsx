'use client';

import LineGraph from '@/components/LineChart';
import { getFakeData } from '@/respository/api';
import { useQuery } from '@tanstack/react-query';
import { ParentSize } from '@visx/responsive';

export default function LinesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['fake-data'],
    queryFn: getFakeData,
  });
  if (isLoading) return <div>loading data...</div>;

  if (data) {
    return (
      <ParentSize>
        {({ width, height }) => (
          <LineGraph
            getX={(d) => new Date(d.date)}
            getY={(d) => d.close}
            data={data}
            width={width}
            height={height}
          />
        )}
      </ParentSize>
    );
  }
}
