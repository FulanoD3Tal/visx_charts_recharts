import { scaleLinear, scaleTime } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { curveBasis } from '@visx/curve';
import { MarkerCircle } from '@visx/marker';
import { GridColumns, GridRows } from '@visx/grid';
import { useTooltip, Tooltip } from '@visx/tooltip';
import { localPoint } from '@visx/event';
import { timeFormat } from '@visx/vendor/d3-time-format';
import { type ChartProps } from '../types/chartTypes';

export default function LineGraph<T>({
  width: widthSvg,
  height: heightSvg,
  data,
  getX,
  getY,
}: ChartProps<T>) {
  const margin = { top: 20, left: 50, bottom: 50, right: 20 };

  const width = widthSvg - margin.left - margin.right;
  const height = heightSvg - margin.top - margin.bottom;

  const xDomain = data.map(getX);
  const yDomain = data.map(getY);

  const xScale = scaleTime<number>({
    domain: [Math.min(...xDomain), Math.max(...xDomain)],
    range: [0, width],
    round: true,
  });

  const yScale = scaleLinear<number>({
    domain: [Math.max(...yDomain) * 1.1, Math.min(...yDomain) * 0.9],
    range: [0, height],
    nice: true,
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
    <>
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
          <AxisBottom
            scale={xScale}
            top={height}
            tickFormat={(v) => timeFormat('%b %Y')(v as Date)}
          />
          <AxisLeft scale={yScale} hideTicks />
          <LinePath
            curve={curveBasis}
            data={data}
            x={(d) => xScale(getX(d)) ?? 0}
            y={(d) => yScale(getY(d)) ?? 0}
            stroke='#8a52de'
            strokeWidth={3}
            onMouseMove={(event) => {
              // const point = localPoint(event) || {
              //   x: 0,
              //   y: 0,
              // };
              // const { clientX, clientY } = event;
              // const index = Math.floor(point.x / eachBand);
              // const name = xScale.domain()[index];
              // const d = data.filter((da) => da.name === name);
              // showTooltip({
              //   tooltipLeft: clientX,
              //   tooltipTop: clientY,
              //   tooltipData: d[0] ?? {},
              // });
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
    </>
  );
}
