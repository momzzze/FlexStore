import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { forwardRef } from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  className?: string;
}

export const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ title, value, description, className }, ref) => (
    <Card ref={ref} className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </CardContent>
    </Card>
  )
);

MetricCard.displayName = 'MetricCard';
