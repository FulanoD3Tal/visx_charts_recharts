import { Metadata } from 'next';
import data from '../../../data/linearData.json';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';
import { MarkerCircle } from '@visx/marker';
import { GridColumns, GridRows } from '@visx/grid';

export const metadata: Metadata = {
  title: 'LineChart | Visx',
};

export default function LinesPage() {
  const widthSvg = 600;
  const heightSvg = 400;

  const margin = { top: 20, left: 50, bottom: 50, right: 20 };

  const width = widthSvg - margin.left - margin.right;
  const height = heightSvg - margin.top - margin.bottom;

  const getX = (d: (typeof data)[0]) => d.name;
  const getY = (d: (typeof data)[0]) => d.uv;

  const xDomain = data.map(getX);
  const yDomain = data.map(getY);

  const xScale = scaleBand<string>({
    domain: xDomain,
    range: [0, width],
  });

  const yScale = scaleLinear<number>({
    domain: [Math.max(...yDomain), Math.min(...yDomain)],
    range: [0, height],
    nice: true,
  });

  return (
    <div>
      <svg width={widthSvg} height={heightSvg}>
        <rect
          x={0}
          y={0}
          width={widthSvg}
          height={heightSvg}
          fill='#f2f2f2'
          rx={12}
        />
        <Group left={margin.left} top={margin.top}>
          <MarkerCircle id='marker-circle' fill='#8a52de' size={1.8} refX={2} />
          <GridRows
            scale={yScale}
            width={width}
            height={height}
            stroke='#ffff'
          />
          <GridColumns
            scale={xScale}
            width={width}
            height={height}
            stroke='#ffff'
          />
          <AxisBottom scale={xScale} top={height} />
          <AxisLeft scale={yScale} />
          <LinePath
            curve={curveBasis}
            data={data}
            x={(d) => xScale(getX(d)) ?? 0}
            y={(d) => yScale(getY(d)) ?? 0}
            stroke='#8a52de'
            strokeWidth={3}
            markerMid='url(#marker-circle)'
          />
        </Group>
      </svg>
    </div>
  );
}
