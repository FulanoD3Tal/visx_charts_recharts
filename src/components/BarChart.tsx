import data from '../data/linearData.json';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { MarkerCircle } from '@visx/marker';
import { GridColumns, GridRows } from '@visx/grid';
import { useTooltip, Tooltip } from '@visx/tooltip';
import { type ChartProps } from '@/types/chartTypes';

export default function BarChart({
  width: widthSvg,
  height: heightSvg,
}: ChartProps) {
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
    padding: 0.1,
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
          <AxisBottom scale={xScale} top={height} />
          <AxisLeft scale={yScale} />
          {data.map((d) => {
            const barWidth = xScale.bandwidth();
            const barHeigth = height - yScale(getY(d) ?? 0);
            const xBar = xScale(getX(d));
            const yBar = height - barHeigth;
            return (
              <Bar
                key={`bar-${d.name}`}
                x={xBar}
                y={yBar}
                width={barWidth}
                height={barHeigth}
                fill='#8a52de'
                onMouseMove={(event) => {
                  const { clientX, clientY } = event;
                  showTooltip({
                    tooltipLeft: clientX,
                    tooltipTop: clientY,
                    tooltipData: d,
                  });
                }}
                onMouseOut={hideTooltip}
              />
            );
          })}
        </Group>
      </svg>
      {tooltipOpen && tooltipData && (
        <Tooltip key={Math.random()} top={tooltipTop} left={tooltipLeft}>
          Value:{' '}
          <strong className='block max-w-[10ch]'>
            {JSON.stringify(tooltipData, null, 2)}
          </strong>
        </Tooltip>
      )}
    </>
  );
}
