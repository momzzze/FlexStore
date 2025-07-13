// src/components/DashboardChart.tsx
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AreaChart, Area, CartesianGrid, XAxis } from 'recharts';

type DataItem = { date: string; [key: string]: number | string };

interface DashboardChartProps {
  title: string;
  description?: string;
  data: DataItem[];
  config: {
    keys: string[];
    colors: Record<string, string>;
  };
  referenceDate?: string;
}

export const DashboardChart: React.FC<DashboardChartProps> = ({
  title,
  description,
  data,
  config,
  referenceDate = new Date().toISOString().split('T')[0],
}) => {
  const [timeRange, setTimeRange] = React.useState('90d');

  const filteredData = React.useMemo(() => {
    const refDate = new Date(referenceDate);
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const startDate = new Date(refDate);
    startDate.setDate(refDate.getDate() - days);
    return data.filter((item) => new Date(item.date) >= startDate);
  }, [data, timeRange, referenceDate]);

  const resolvedColors = React.useMemo(() => {
    if (typeof window === 'undefined') return {};
    const style = getComputedStyle(document.documentElement);
    return Object.fromEntries(
      config.keys.map((key) => [
        key,
        style.getPropertyValue(config.colors[key]).trim(),
      ])
    );
  }, [config]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between flex-wrap">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="w-full">
        <ChartContainer
          className="h-[400px] w-full"
          config={Object.fromEntries(
            config.keys.map((key) => [
              key,
              {
                label: key, // Optional: you can humanize if needed
                color: resolvedColors[key],
              },
            ])
          )}
        >
          <AreaChart data={filteredData}>
            <defs>
              {config.keys.map((key) => (
                <linearGradient
                  id={`fill-${key}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  key={key}
                >
                  <stop
                    offset="5%"
                    stopColor={resolvedColors[key]}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={resolvedColors[key]}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(v) =>
                new Date(v).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(v) =>
                    new Date(v).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }
                />
              }
            />
            {config.keys.map((key) => (
              <Area
                key={key}
                dataKey={key}
                type="natural"
                fill={`url(#fill-${key})`}
                stroke={resolvedColors[key]}
                stackId="a"
              />
            ))}
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
