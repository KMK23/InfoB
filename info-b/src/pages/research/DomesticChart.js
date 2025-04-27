import React, { useEffect, useState } from "react";
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
import { getDatas } from "../API/firebase";

function DomesticChart({ financials = [] }) {
  const [chartData, setChartData] = useState([]);
  const data = financials.map((item) => ({
    ...item,
    year: item.year.toString(),
  }));

  useEffect(() => {
    const getChartData = async () => {
      const data = await getDatas("chart");
      const orderedData = data.sort((a, b) => a.year - b.year);
      setChartData(orderedData);
    };

    getChartData();
  }, []);

  return (
    <div className="mx-20 mt-20">
      <div>
        <h1 className="text-3xl font-bold">국내실적</h1>
      </div>

      <div
        style={{ width: "50%", height: 500 }}
        className="border border-gray-300 rounded-md py-3 px-2"
      >
        {chartData.length > 0 ? (
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 30, right: 30, left: 50, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) =>
                  `${(value / 1000000).toFixed(0)}백만원`
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
        ) : (
          <div className="flex justify-center items-center h-full text-gray-400 text-xl">
            데이터가 없습니다
          </div>
        )}
      </div>
    </div>
  );
}

export default DomesticChart;
