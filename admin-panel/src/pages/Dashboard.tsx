import { useState } from 'react';
import { MetricCard } from '@/components/dashboard/MetricCard';
import { DashboardChart } from '@/components/DashBoardChart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  visitorsChartConfig,
  amountsChartConfig,
  ordersChartConfig,
} from '@/utils/chartManipulations';
import { ProjectTableContainer } from '@/components/dashboard/ProjectTasksTable';

export const projects = [
  {
    id: 1,
    name: 'Cover Page',
    sectionType: 'Cover',
    status: 'In Progress',
    target: 18,
    limit: 5,
    reviewer: 'Eddie Lake',
  },
  {
    id: 2,
    name: 'Table of Contents',
    sectionType: 'Contents',
    status: 'Done',
    target: 29,
    limit: 24,
    reviewer: 'Eddie Lake',
  },
  {
    id: 3,
    name: 'Executive Summary',
    sectionType: 'Narrative',
    status: 'Done',
    target: 10,
    limit: 13,
    reviewer: 'Eddie Lake',
  },
  {
    id: 4,
    name: 'Technical Approach',
    sectionType: 'Narrative',
    status: 'Done',
    target: 27,
    limit: 23,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 5,
    name: 'Design',
    sectionType: 'Narrative',
    status: 'In Progress',
    target: 2,
    limit: 16,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 6,
    name: 'Capabilities',
    sectionType: 'Narrative',
    status: 'In Progress',
    target: 20,
    limit: 8,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 7,
    name: 'Integration with existing systems',
    sectionType: 'Narrative',
    status: 'In Progress',
    target: 19,
    limit: 21,
    reviewer: 'Jamik Tashpulatov',
  },
  {
    id: 8,
    name: 'Innovation and Advantages',
    sectionType: 'Narrative',
    status: 'Done',
    target: 25,
    limit: 26,
    reviewer: '',
  },
  {
    id: 9,
    name: 'Overview of EMR’s Innovative Solutions',
    sectionType: 'Technical Content',
    status: 'Done',
    target: 7,
    limit: 23,
    reviewer: '',
  },
  {
    id: 10,
    name: 'Advanced Algorithms and Machine Learning',
    sectionType: 'Narrative',
    status: 'Done',
    target: 30,
    limit: 28,
    reviewer: '',
  },
];

const columns = [
  { label: 'Section', render: (p) => p.name },
  { label: 'Type', render: (p) => p.sectionType },
  { label: 'Status', render: (p) => p.status },
  { label: 'Target', render: (p) => p.target },
  { label: 'Limit', render: (p) => p.limit },
  { label: 'Reviewer', render: (p) => p.reviewer },
];
export default function Dashboard() {
  const [selectedChart, setSelectedChart] = useState<
    'visitors' | 'amounts' | 'orders'
  >('visitors');

  const chartMap = {
    visitors: visitorsChartConfig,
    amounts: amountsChartConfig,
    orders: ordersChartConfig,
  };

  const chartConfig = chartMap[selectedChart];

  const mockData = {
    totalRevenue: '$1,250.00',
    newCustomers: 1234,
    activeAccounts: 45678,
    growthRate: '4.5%',
  };

  return (
    <div className="p-6 w-full flex flex-col space-y-6 bg-background">
      <h1 className="text-2xl font-bold">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Revenue"
          value={mockData.totalRevenue}
          description="Trending up this month"
        />
        <MetricCard
          title="New Customers"
          value={mockData.newCustomers}
          description="Down 20% this period"
        />
        <MetricCard
          title="Active Accounts"
          value={mockData.activeAccounts}
          description="Strong user retention"
        />
        <MetricCard
          title="Growth Rate"
          value={mockData.growthRate}
          description="Steady performance increase"
        />
      </div>

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{chartConfig.title}</h2>
        <Select
          value={selectedChart}
          onValueChange={(val) => setSelectedChart(val as any)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-muted text-popover-foreground font-medium shadow-md rounded-md">
            <SelectItem className="hover:bg-muted-foreground" value="visitors">
              Visitors
            </SelectItem>
            <SelectItem className="hover:bg-muted-foreground" value="amounts">
              Amounts
            </SelectItem>
            <SelectItem className="hover:bg-muted-foreground" value="orders">
              Orders
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DashboardChart
        title={chartConfig.title}
        description={chartConfig.description}
        data={chartConfig.data}
        config={chartConfig.config}
      />
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-6">
          <ProjectTableContainer
            data={projects}
            columns={columns}
            title="Project Breakdown"
          />
        </div>
      </div>
    </div>
  );
}
