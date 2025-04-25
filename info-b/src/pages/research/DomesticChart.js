import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const jsonData = {
  financials: [
    {
      year: 2017,
      revenue: 23745455,
      operatingProfit: 2550757,
      totalAssets: 28725614,
      totalEquity: 12551426,
    },
    {
      year: 2018,
      revenue: 279648790,
      operatingProfit: 47625122,
      totalAssets: 174391619,
      totalEquity: 56554138,
    },
    {
      year: 2019,
      revenue: 1498612449,
      operatingProfit: 17225333,
      totalAssets: 355974504,
      totalEquity: 234507340,
    },
    {
      year: 2020,
      revenue: 1437064272,
      operatingProfit: 79924745,
      totalAssets: 754636132,
      totalEquity: 321139061,
    },
    {
      year: 2021,
      revenue: 2024000000,
      operatingProfit: 75336000,
      totalAssets: 754636000,
      totalEquity: 321139000,
    },
  ],
};
function DomesticChart(props) {
  const data = jsonData.financials.map((item) => ({
    ...item,
    year: item.year.toString(), // X축에 문자열로 표시되도록 변환
  }));
  return (
    <div className="mx-20 mt-20">
      <div>
        <h1 className="text-3xl font-bold">국내실적</h1>
      </div>
      <div
        style={{ width: "50%", height: 500 }}
        className="border border-gray-300  rounded-md py-3 px-2"
      >
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis
              tickFormatter={(value) =>
                `${(value / 10000000).toFixed(0)}백만원`
              }
            />
            <Tooltip
              formatter={(value) =>
                `${(value / 10000000).toFixed(0)}억 ${Math.round(
                  (value % 10000000) / 10000
                )}만원`
              }
              labelFormatter={(label) => `${label}년`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="매출액"
              stroke="#00C49F"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="operatingProfit"
              name="영업이익"
              stroke="#0088FE"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="totalAssets"
              name="자산총계"
              stroke="#FFBB28"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="totalEquity"
              name="자본총계"
              stroke="#FF8042"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DomesticChart;
