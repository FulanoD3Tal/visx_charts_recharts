'use client';
import data from '../../../data/linearData.json';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';
import { MarkerCircle } from '@visx/marker';
import { GridColumns, GridRows } from '@visx/grid';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

export default function LinesPage() {
  const widthSvg = 600;
  const heightSvg = 400;

  const margin = { top: 20, left: 50, bottom: 50, right: 20 };

  const width = widthSvg - margin.left - margin.right;
  const height = heightSvg - margin.top - margin.bottom;

  const getX = (d: (typeof data)[0]) => d.name;
  const getY = (d: (typeof data)[0]) => d.amt;

  const xDomain = data.map(getX);
  const yDomain = data.map(getY);

  const xScale = scaleBand<string>({
    domain: xDomain,
    range: [0, width],
  });

  const eachBand = xScale.step();

  const yScale = scaleLinear<number>({
    domain: [Math.max(...yDomain), Math.min(...yDomain)],
    range: [0, height],
  });

  const {
    tooltipOpen,
    showTooltip,
    hideTooltip,
    tooltipData,
    tooltipTop,
    tooltipLeft,
  } = useTooltip<Partial<(typeof data)[0]>>();

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
            onMouseMove={(event) => {
              const point = localPoint(event) || {
                x: 0,
                y: 0,
              };
              const { clientX, clientY } = event;
              const index = Math.floor(point.x / eachBand);
              const name = xScale.domain()[index];
              const d = data.filter((da) => da.name === name);
              showTooltip({
                tooltipLeft: clientX,
                tooltipTop: clientY,
                tooltipData: d[0] ?? {},
              });
            }}
            onMouseOut={hideTooltip}
          />
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip key={Math.random()} top={tooltipTop} left={tooltipLeft}>
          Value: <strong>{JSON.stringify(tooltipData)}</strong>
        </Tooltip>
      )}
    </div>
  );
}
