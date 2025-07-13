export const visitorsData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split('T')[0],
    desktop: Math.floor(100 + Math.random() * 300),
    mobile: Math.floor(100 + Math.random() * 400),
  };
});

export const amountsData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split('T')[0],
    incoming: Math.floor(1000 + Math.random() * 5000),
    outgoing: Math.floor(800 + Math.random() * 4000),
  };
});

export const ordersData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - i);
  return {
    date: date.toISOString().split('T')[0],
    delivered: Math.floor(20 + Math.random() * 50),
    canceled: Math.floor(2 + Math.random() * 10),
  };
});

export const visitorsChartConfig = {
  title: 'Total Visitors',
  description: 'Desktop vs Mobile for the last 90 days',
  data: visitorsData,
  config: {
    keys: ['desktop', 'mobile'],
    colors: {
      desktop: '--chart-1',
      mobile: '--chart-2',
    },
  },
};

export const amountsChartConfig = {
  title: 'Total Amounts',
  description: 'Incoming vs Outgoing for the last 90 days',
  data: amountsData,
  config: {
    keys: ['incoming', 'outgoing'],
    colors: {
      incoming: '--chart-1',
      outgoing: '--chart-2',
    },
  },
};

export const ordersChartConfig = {
  title: 'Total Orders',
  description: 'Delivered vs Canceled for the last 90 days',
  data: ordersData,
  config: {
    keys: ['delivered', 'canceled'],
    colors: {
      delivered: '--chart-1',
      canceled: '--chart-2',
    },
  },
};
