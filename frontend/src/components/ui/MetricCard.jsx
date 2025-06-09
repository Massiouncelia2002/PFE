import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const MetricCard = ({ title, value, change, isPositive }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 flex flex-col justify-between">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
      <div className="mt-2 flex items-center justify-between">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        <div className={`flex items-center text-sm font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
          {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
          {change}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
