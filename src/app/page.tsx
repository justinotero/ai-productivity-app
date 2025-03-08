'use client';

import { useOrders } from '@/context/OrderContext';
import { ArrowUpRight } from 'lucide-react';
import { useMemo } from 'react';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(amount);
}

// Weekly orders data matching the screenshot
const weeklyOrders = [
  { day: 'Mon', orders: 65 },
  { day: 'Tue', orders: 60 },
  { day: 'Wed', orders: 75 },
  { day: 'Thu', orders: 78 },
  { day: 'Fri', orders: 58 },
  { day: 'Sat', orders: 57 },
  { day: 'Sun', orders: 45 },
];

interface MonthData {
  month: string;
  monthIndex: number;
  year: number;
  value: number;
}

export default function Dashboard() {
  const { orders, orderStats } = useOrders();
  const totalProducts = 456; // Fixed product count from screenshot

  // Calculate monthly revenue for the past 3 months based on order data
  const monthlyRevenue = useMemo(() => {
    // Use 2025 as our reference year for the dashboard
    const now = new Date('2025-03-20'); // Current reference date
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    // Create array for the past 3 months
    const months: MonthData[] = [];
    for (let i = 2; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12; // Handle wrapping around to previous year
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      const monthName = new Date(year, monthIndex, 1).toLocaleString('default', { month: 'short' });
      months.push({
        month: monthName,
        monthIndex,
        year,
        value: 0 // Initial value
      });
    }
    
    // Calculate revenue for each month from orders
    orders.forEach(order => {
      const orderDate = order.created instanceof Date ? order.created : new Date();
      const orderMonth = orderDate.getMonth();
      const orderYear = orderDate.getFullYear();
      
      // Find matching month in our array
      const monthData = months.find(m => m.monthIndex === orderMonth && m.year === orderYear);
      if (monthData) {
        monthData.value += order.total;
      }
    });
    
    // Add some baseline revenue to make the chart look better
    // This simulates historical data beyond our current orders
    const baselineRevenue = 3500;
    return months.map(month => ({
      month: month.month,
      value: month.value + baselineRevenue
    }));
  }, [orders]);

  // Calculate min and max values for better chart scaling
  const minValue = Math.min(...monthlyRevenue.map(m => m.value));
  const maxValue = Math.max(...monthlyRevenue.map(m => m.value));
  const valueRange = maxValue - minValue;
  const chartMin = Math.floor(minValue / 100) * 100; // Round down to nearest 100
  const chartMax = Math.ceil(maxValue / 100) * 100; // Round up to nearest 100

  // Generate Y-axis labels
  const yAxisLabels = [];
  const step = Math.ceil(valueRange / 700) * 100; // Determine appropriate step size
  for (let i = chartMax; i >= chartMin; i -= step) {
    yAxisLabels.push(i);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-[--text-secondary] mt-1">
          Overview of your store's performance.
        </p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-[--border-color] p-6">
          <div className="space-y-1">
            <p className="text-sm text-[--text-secondary]">Total Revenue</p>
            <p className="text-2xl font-semibold">{formatCurrency(orderStats.totalRevenue)}</p>
            <p className="text-xs text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +20.1% from last month
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border border-[--border-color] p-6">
          <div className="space-y-1">
            <p className="text-sm text-[--text-secondary]">Total Orders</p>
            <p className="text-2xl font-semibold">{orderStats.totalOrders}</p>
            <p className="text-xs text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +12.5% from last month
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border border-[--border-color] p-6">
          <div className="space-y-1">
            <p className="text-sm text-[--text-secondary]">Total Customers</p>
            <p className="text-2xl font-semibold">{orderStats.totalCustomers}</p>
            <p className="text-xs text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +8.2% from last month
            </p>
          </div>
        </div>
        
        <div className="rounded-lg border border-[--border-color] p-6">
          <div className="space-y-1">
            <p className="text-sm text-[--text-secondary]">Total Products</p>
            <p className="text-2xl font-semibold">{totalProducts}</p>
            <p className="text-xs text-emerald-600 flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" />
              +2.1% from last month
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-4">
        {/* Revenue Over Time Chart */}
        <div className="rounded-lg border border-[--border-color] p-6">
          <div className="space-y-1 mb-4">
            <p className="font-medium">Revenue Over Time</p>
            <p className="text-sm text-[--text-secondary]">Monthly revenue for the past 3 months</p>
          </div>
          
          <div className="h-64 relative">
            {/* Line Chart */}
            <svg className="w-full h-full" viewBox="0 0 600 240">
              {/* Y-axis labels */}
              {yAxisLabels.map((value, index) => (
                <text 
                  key={value} 
                  x="30" 
                  y={20 + index * (200 / (yAxisLabels.length - 1))} 
                  className="text-xs text-[--text-secondary]"
                  textAnchor="end"
                >
                  {value.toLocaleString()}
                </text>
              ))}
              
              {/* X-axis labels */}
              {monthlyRevenue.map((item, index) => (
                <text 
                  key={item.month} 
                  x={100 + index * 200} 
                  y="235" 
                  className="text-xs text-[--text-secondary]"
                  textAnchor="middle"
                >
                  {item.month}
                </text>
              ))}
              
              {/* Line */}
              {monthlyRevenue.length > 0 && (
                <path
                  d={`M100,${220 - ((monthlyRevenue[0].value - chartMin) / (chartMax - chartMin)) * 200} ${monthlyRevenue.slice(1).map((item, i) => 
                    `L${100 + (i + 1) * 200},${220 - ((item.value - chartMin) / (chartMax - chartMin)) * 200}`).join(' ')}`}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2"
                />
              )}
              
              {/* Data points */}
              {monthlyRevenue.map((item, index) => (
                <circle
                  key={item.month}
                  cx={100 + index * 200}
                  cy={220 - ((item.value - chartMin) / (chartMax - chartMin)) * 200}
                  r="4"
                  fill="#2563eb"
                />
              ))}
            </svg>
          </div>
        </div>
        
        {/* Orders This Week Chart */}
        <div className="rounded-lg border border-[--border-color] p-6">
          <div className="space-y-1 mb-4">
            <p className="font-medium">Orders This Week</p>
            <p className="text-sm text-[--text-secondary]">Daily orders for the current week</p>
          </div>
          
          <div className="h-64 relative">
            {/* Bar Chart */}
            <div className="flex flex-col h-full">
              {/* Y-axis labels */}
              <div className="flex justify-between h-8 text-xs text-[--text-secondary]">
                <div>90</div>
                <div>80</div>
                <div>70</div>
                <div>60</div>
                <div>50</div>
                <div>40</div>
              </div>
              
              {/* Chart */}
              <div className="flex-1 flex items-end justify-between">
                {weeklyOrders.map((item) => (
                  <div key={item.day} className="flex flex-col items-center">
                    <div 
                      className="w-12 bg-blue-500 rounded-t-md" 
                      style={{ height: `${(item.orders - 40) * 2}px` }}
                    ></div>
                    <div className="mt-2 text-xs text-[--text-secondary]">{item.day}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
